import React, { useState, useEffect, useRef } from "react";
import {
  Heart,
  Music,
  Stethoscope,
  MapPin,
  Calendar,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Star,
  Sparkles,
  Camera,
} from "lucide-react";
import * as THREE from "three";

const KpopNurseWebsite = () => {
  const metDate = new Date("2024-01-01");
  const [daysSinceMet, setDaysSinceMet] = useState(0);
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(0);

  const mountRef = useRef(null);
  const animationRef = useRef(null);

  const dates = [
    {
      date: "2024-01-15",
      activity: "First coffee date at that cute café",
      location: "Downtown Café",
      emoji: "☕",
    },
    {
      date: "2024-02-14",
      activity: "Valentine's dinner under the stars",
      location: "Rooftop Restaurant",
      emoji: "🌟",
    },
    {
      date: "2024-03-10",
      activity: "K-pop concert - you sang along to everything!",
      location: "Concert Hall",
      emoji: "🎤",
    },
    {
      date: "2024-04-22",
      activity: "Weekend getaway to the beach",
      location: "Coastal Resort",
      emoji: "🏖️",
    },
    {
      date: "2024-05-18",
      activity: "Picnic in the park after your night shift",
      location: "Central Park",
      emoji: "🧺",
    },
  ];

  const playlist = [
    { title: "Dynamite", artist: "BTS", duration: "3:19", color: "#ff6b6b" },
    {
      title: "How You Like That",
      artist: "BLACKPINK",
      duration: "3:01",
      color: "#4ecdc4",
    },
    {
      title: "Next Level",
      artist: "aespa",
      duration: "3:30",
      color: "#45b7d1",
    },
    { title: "WANNABE", artist: "ITZY", duration: "3:13", color: "#f9ca24" },
    {
      title: "God's Menu",
      artist: "Stray Kids",
      duration: "2:58",
      color: "#6c5ce7",
    },
    {
      title: "Feel My Rhythm",
      artist: "Red Velvet",
      duration: "3:23",
      color: "#fd79a8",
    },
    {
      title: "ANTIFRAGILE",
      artist: "LE SSERAFIM",
      duration: "3:06",
      color: "#00b894",
    },
    { title: "Eleven", artist: "IVE", duration: "2:58", color: "#e84393" },
  ];

  const photos = [
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400&h=600&fit=crop",
  ];

  useEffect(() => {
    const calculateDays = () => {
      const today = new Date();
      const diffTime = Math.abs(today - metDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysSinceMet(diffDays);
    };

    calculateDays();
    const interval = setInterval(calculateDays, 1000 * 60 * 60);
    return () => clearInterval(interval);
  }, []);

  // 3D Music Box Setup
  useEffect(() => {
    if (!mountRef.current) return;

    // Clean up previous content
    while (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(300, 300);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Music box base
    const baseGeometry = new THREE.CylinderGeometry(1.5, 1.5, 0.4, 32);
    const baseMaterial = new THREE.MeshPhongMaterial({
      color: 0x8b4513,
      shininess: 100,
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = -1;
    base.castShadow = true;
    scene.add(base);

    // Music box lid
    const lidGeometry = new THREE.CylinderGeometry(1.2, 1.2, 0.1, 32);
    const lidMaterial = new THREE.MeshPhongMaterial({
      color: 0xff69b4,
      shininess: 150,
    });
    const lid = new THREE.Mesh(lidGeometry, lidMaterial);
    lid.position.y = -0.8;
    lid.castShadow = true;
    scene.add(lid);

    // Dancing figure
    const figureGroup = new THREE.Group();

    // Body
    const bodyGeometry = new THREE.ConeGeometry(0.15, 0.8, 8);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0xff69b4 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.4;
    figureGroup.add(body);

    // Head
    const headGeometry = new THREE.SphereGeometry(0.15, 16, 16);
    const headMaterial = new THREE.MeshPhongMaterial({ color: 0xffdbac });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 0.9;
    figureGroup.add(head);

    // Arms
    const armGeometry = new THREE.CylinderGeometry(0.03, 0.03, 0.3, 8);
    const armMaterial = new THREE.MeshPhongMaterial({ color: 0xffdbac });

    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(-0.18, 0.6, 0);
    leftArm.rotation.z = 0.5;
    figureGroup.add(leftArm);

    const rightArm = new THREE.Mesh(armGeometry, armMaterial);
    rightArm.position.set(0.18, 0.6, 0);
    rightArm.rotation.z = -0.5;
    figureGroup.add(rightArm);

    figureGroup.position.y = -0.5;
    scene.add(figureGroup);

    // Sparkles
    const sparkles = [];
    for (let i = 0; i < 20; i++) {
      const sparkleGeometry = new THREE.SphereGeometry(0.02, 8, 8);
      const sparkleMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(Math.random(), 1, 0.5),
      });
      const sparkle = new THREE.Mesh(sparkleGeometry, sparkleMaterial);
      sparkle.position.set(
        (Math.random() - 0.5) * 4,
        Math.random() * 2,
        (Math.random() - 0.5) * 4
      );
      sparkles.push(sparkle);
      scene.add(sparkle);
    }

    camera.position.set(0, 1, 4);
    camera.lookAt(0, 0, 0);

    // Animation loop
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (event) => {
      if (!mountRef.current) return;
      const rect = mountRef.current.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    mountRef.current.addEventListener("mousemove", onMouseMove);

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      if (isPlaying) {
        figureGroup.rotation.y += 0.02;

        sparkles.forEach((sparkle, index) => {
          sparkle.rotation.x += 0.01;
          sparkle.rotation.y += 0.01;
          sparkle.position.y += Math.sin(Date.now() * 0.001 + index) * 0.001;
        });
      }

      // Camera movement based on mouse
      camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
      camera.position.y += (-mouseY * 2 + 2 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeEventListener("mousemove", onMouseMove);
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isPlaying]);

  const nextPhoto = () => setCurrentPhoto((prev) => (prev + 1) % photos.length);
  const prevPhoto = () =>
    setCurrentPhoto((prev) => (prev - 1 + photos.length) % photos.length);
  const nextSong = () => setCurrentSong((prev) => (prev + 1) % playlist.length);
  const prevSong = () =>
    setCurrentSong((prev) => (prev - 1 + playlist.length) % playlist.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-40 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 mb-6">
            My Beautiful Nurse 💕
          </h1>
          <div className="flex justify-center items-center space-x-8 text-xl">
            <div className="flex items-center space-x-3 bg-gradient-to-r from-pink-500/30 to-red-500/30 px-6 py-3 rounded-full border border-pink-400/50">
              <Stethoscope className="w-6 h-6 text-pink-400" />
              <span className="text-white font-bold">HEALING</span>
            </div>
            <div className="flex items-center space-x-3 bg-gradient-to-r from-purple-500/30 to-pink-500/30 px-6 py-3 rounded-full border border-purple-400/50">
              <Music className="w-6 h-6 text-purple-400" />
              <span className="text-white font-bold">K-POP</span>
            </div>
            <div className="flex items-center space-x-3 bg-gradient-to-r from-blue-500/30 to-purple-500/30 px-6 py-3 rounded-full border border-blue-400/50">
              <MapPin className="w-6 h-6 text-blue-400" />
              <span className="text-white font-bold">ADVENTURE</span>
            </div>
          </div>
        </div>

        {/* Days Counter */}
        <div className="mb-12 text-center">
          <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-xl rounded-3xl p-8 border border-pink-400/30">
            <Calendar className="w-16 h-16 text-pink-400 mx-auto mb-4" />
            <div className="text-6xl font-bold text-white mb-2">
              {daysSinceMet}
            </div>
            <p className="text-2xl text-pink-300 font-bold">DAYS OF MAGIC</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* 3D Music Box */}
          <div className="bg-gradient-to-br from-purple-500/30 to-pink-500/30 backdrop-blur-lg rounded-2xl p-6 border border-purple-300/20">
            <h3 className="text-2xl font-bold text-white mb-4 text-center flex items-center justify-center">
              <Sparkles className="w-6 h-6 mr-2" />
              Interactive Music Box
              <Sparkles className="w-6 h-6 ml-2" />
            </h3>

            <div className="flex justify-center mb-6">
              <div
                ref={mountRef}
                className="rounded-xl overflow-hidden border border-purple-400/50 shadow-lg"
                style={{ width: "300px", height: "300px" }}
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-center space-x-4">
                <button
                  onClick={prevSong}
                  className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white p-3 rounded-full transition-all duration-300"
                >
                  <SkipBack className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-4 rounded-full transition-all duration-300 transform hover:scale-110"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6" />
                  )}
                </button>
                <button
                  onClick={nextSong}
                  className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white p-3 rounded-full transition-all duration-300"
                >
                  <SkipForward className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-white hover:text-pink-400 transition-colors"
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => setVolume(e.target.value)}
                  className="flex-1 h-2 bg-gray-700 rounded-lg"
                />
              </div>

              <div className="text-center">
                <p className="text-lg text-white font-bold">
                  {playlist[currentSong].title}
                </p>
                <p className="text-pink-300">{playlist[currentSong].artist}</p>
                <p className="text-cyan-300 mt-2 text-sm">
                  {isPlaying
                    ? "Move your mouse to control the camera! 🎭"
                    : "Press play to start the magic! ✨"}
                </p>
              </div>
            </div>
          </div>

          {/* Photo Gallery */}
          <div className="bg-gradient-to-br from-blue-500/30 to-purple-500/30 backdrop-blur-lg rounded-2xl p-6 border border-blue-300/20">
            <h3 className="text-2xl font-bold text-white mb-4 text-center">
              <Camera className="inline w-6 h-6 mr-2" />
              Our Adventures
            </h3>

            <div className="relative group">
              <img
                src={photos[currentPhoto]}
                alt={`Memory ${currentPhoto + 1}`}
                className="w-full h-64 object-cover rounded-xl shadow-lg transition-all duration-500 group-hover:scale-105"
              />

              <button
                onClick={prevPhoto}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full transition-all"
              >
                <SkipBack className="w-5 h-5" />
              </button>
              <button
                onClick={nextPhoto}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full transition-all"
              >
                <SkipForward className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {photos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPhoto(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentPhoto
                        ? "bg-blue-400 scale-125"
                        : "bg-white/30 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Playlist */}
          <div className="bg-gradient-to-br from-pink-500/30 to-red-500/30 backdrop-blur-lg rounded-2xl p-6 border border-pink-300/20">
            <h3 className="text-2xl font-bold text-white mb-4 text-center">
              <Music className="inline w-6 h-6 mr-2" />
              K-POP Playlist
            </h3>

            <div className="space-y-2 max-h-80 overflow-y-auto">
              {playlist.map((song, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    index === currentSong
                      ? "bg-gradient-to-r from-pink-500/50 to-red-500/50 border border-pink-400/70 scale-105"
                      : "bg-white/10 hover:bg-white/20"
                  }`}
                  onClick={() => setCurrentSong(index)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: song.color }}
                      />
                      <div>
                        <p className="font-bold text-white">{song.title}</p>
                        <p className="text-sm text-pink-200">{song.artist}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-white/70 text-sm">
                        {song.duration}
                      </span>
                      {index === currentSong && isPlaying && (
                        <div className="flex space-x-1">
                          {[...Array(3)].map((_, i) => (
                            <div
                              key={i}
                              className="w-1 bg-pink-400 rounded-full animate-pulse"
                              style={{
                                height: `${Math.random() * 15 + 8}px`,
                                animationDelay: `${i * 0.1}s`,
                              }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-12 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 backdrop-blur-lg rounded-2xl p-8 border border-indigo-300/20">
          <h3 className="text-3xl font-bold text-white mb-8 text-center">
            <Star className="inline w-8 h-8 mr-2" />
            Our Love Story
            <Star className="inline w-8 h-8 ml-2" />
          </h3>

          <div className="space-y-6">
            {dates.map((date, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 bg-white/10 rounded-xl p-4 hover:bg-white/20 transition-all group"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center text-white text-xl font-bold group-hover:scale-110 transition-all">
                    {date.emoji}
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="flex items-center space-x-3 mb-2">
                    <Calendar className="w-5 h-5 text-pink-300" />
                    <span className="text-pink-200 font-semibold">
                      {new Date(date.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <p className="text-white text-lg mb-2">{date.activity}</p>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-blue-300" />
                    <span className="text-blue-200">{date.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Love Message */}
        <div className="mt-12 text-center bg-gradient-to-r from-pink-500/30 to-red-500/30 backdrop-blur-lg rounded-2xl p-8 border border-pink-300/20">
          <h3 className="text-3xl font-bold text-white mb-4">
            To My Amazing Nurse 👩‍⚕️💖
          </h3>
          <p className="text-xl text-pink-100 leading-relaxed max-w-3xl mx-auto mb-6">
            Every day with you feels like a new adventure. From healing hearts
            at the hospital to dancing along to your favorite K-pop songs, you
            bring joy and light wherever you go. Thank you for being the most
            incredible person I know. Here's to many more days of laughter,
            love, and unforgettable memories together! 🌟
          </p>
          <div className="flex justify-center space-x-4">
            <Heart className="w-8 h-8 text-red-400 animate-pulse" />
            <Heart className="w-8 h-8 text-pink-400 animate-pulse" />
            <Heart className="w-8 h-8 text-red-400 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default KpopNurseWebsite;
