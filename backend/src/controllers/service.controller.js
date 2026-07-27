export const getServices = async (req, res) => {
  try {
    const services = [
      {
        id: "serv-1",
        title: "Preventative & General Dentistry",
        description: "Routine oral checkups, low-radiation digital X-rays, professional cleaning, and cavity protection tailored for patients of all ages.",
        image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: "serv-2",
        title: "3D Digital Implant Surgery",
        description: "Precision guided dental implant placement utilizing 3D CBCT scans and intraoral digital modeling for permanent smile restoration.",
        image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: "serv-3",
        title: "Invisalign® & Orthodontics",
        description: "Discreet clear aligners, digital impression tracking, and bite correction designed for predictable, comfortable alignment.",
        image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: "serv-4",
        title: "Cosmetic & Veneers",
        description: "Custom porcelain veneers, laser teeth whitening, and aesthetic smile makeovers executed with artistic shading precision.",
        image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: "serv-5",
        title: "Emergency Dental Care",
        description: "Same-day urgent appointments reserved daily for acute toothaches, chipped teeth, root canals, and urgent pain relief.",
        image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: "serv-6",
        title: "Pediatric & Sedation Care",
        description: "Gentle child-friendly dentistry, nitrous oxide (laughing gas), and oral conscious sedation to eliminate patient dental anxiety.",
        image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=600&q=80",
      },
    ];

    return res.json({ success: true, data: services });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
