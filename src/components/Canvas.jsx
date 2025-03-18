import { useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Bounds, useGLTF } from "@react-three/drei";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { IoMdCloudUpload } from "react-icons/io";

const Model = ({ file }) => {
    const { scene } = useGLTF(file);
    return <primitive object={scene} />;
};

const FitViewHelper = ({ boundsRef }) => {
    const { camera, controls } = useThree();

    useEffect(() => {
        if (boundsRef.current) {
            boundsRef.current.refresh().fit();
        }
        if (controls) {
            controls.reset();
        }
        camera.position.set(3, 3, 5);
        camera.lookAt(0, 0, 0);
    }, [camera, controls, boundsRef]);

    return null; // This component does not render anything
};

export default function ThreeCanvas() {
    const [file, setFile] = useState(null);
    const [showModel, setShowModel] = useState(true);
    const boundsRef = useRef();
    const orbitRef = useRef();
    const [triggerFitView, setTriggerFitView] = useState(false); // State to trigger Fit View


    const handleFileChange = (event) => {
        const fileURL = URL.createObjectURL(event.target.files[0]);
        setFile(fileURL);
        setTimeout(() => setTriggerFitView((prev) => !prev), 100); // Trigger Fit View
    };


    return (
        <div className="container" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px" }}>
            <h1 className="text-center my-3">3D Canvas</h1>
            <div className="mb-3">
                <input id="file-upload" type="file" className="d-none" onChange={handleFileChange} accept=".glb, .gltf" />
                <label htmlFor="file-upload" className="btn btn-info d-flex align-items-center gap-2">
                    <IoMdCloudUpload size={20} /> Upload File
                </label>
            </div>

            <div className="canvas-container border shadow" style={{ width: "75%", height: "50vh", marginTop: "10px" }}>
                <Canvas camera={{ position: [0, 2, 5] }}>
                    <ambientLight intensity={0.3} /> {/* Dim ambient light */}
                    <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow /> {/* Main light */}
                    <spotLight position={[-5, 10, 5]} intensity={1.2} angle={0.3} penumbra={0.5} castShadow />
                    <OrbitControls ref={orbitRef} makeDefault autoRotate autoRotateSpeed={1} panSpeed={0.5} zoomSpeed={0.8} />
                    <Bounds ref={boundsRef} fit clip observe>
                        {showModel && file && <Model file={file} />}
                    </Bounds>
                </Canvas>
            </div>

            {file && (
                <div style={{ marginTop: "10px" }}>
                    <button className="btn btn-info" onClick={() => setShowModel(!showModel)}>
                        {showModel ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                    </button>
                    <button onClick={() => setTriggerFitView((prev) => !prev)} className="ms-3 btn btn-info">
                        Fit View
                    </button>
                </div>
            )}
        </div>
    );
}
