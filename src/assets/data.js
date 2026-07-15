import { CreditCard, Files, LayoutDashboard, Receipt, Upload } from "lucide-react";

export const features = [{
        iconName: "ArrowUpCircle",
        iconColor: "text-purple-500",
        title: "Easy File Upload",
        description: "Quickly upload your files with our intuitive drag and drop interface."
    },
    {
        iconName: "Shield",
        iconColor: "text-green-500",
        title: "Secure Storage",
        description: "Your files are encrypted and stored securely in our cloud infrastructure."
    },
    {
        iconName: "Share2",
        iconColor: "text-purple-500",
        title: "Simple Sharing",
        description: "Share files with anyone using secure links that you control."
    },
    {
        iconName: "CreditCard",
        iconColor: "text-orange-500",
        title: "Flexible Credits",
        description: "Pay only for what you use with our credit-based system."
    },
    {
        iconName: "FileText",
        iconColor: "text-red-500",
        title: "File Management",
        description: "Organize, preview, and manage your files from any device."
    },
    {
        iconName: "Clock",
        iconColor: "text-indigo-500",
        title: "Transaction History",
        description: "Keep track of all your credit purchase and usage."
    },


];

export const pricingPlans = [{
        name: "Free",
        price: "0",
        description: "Perfect for getting started",
        features: [
            "5 file uploads",
            "Basic File Sharing",
            "7-day file retention",
            "Email Support",
        ],
        cta: "Get Started",
        highlighted: false,
    },
    {
        name: "Premium",
        price: "500",
        description: "For individuals with larger needs",
        features: [
            "500 file uploads",
            "Advanced File Sharing",
            "30-day file retention",
            "File Analytics",
        ],
        cta: "Get Premium",
        highlighted: true,
    },
    {
        name: "Ultimate",
        price: "2500",
        description: "For teams and buisnesses",
        features: [
            "5000 file uploads",
            "Team Sharing capabilities",
            "Unlimited file retention",
            "Advanced Analytics",
            "API Access"
        ],
        cta: "Get Ultimate",
        highlighted: false,
    },
];

export const testimonials = [{
        name: "Sarah Johnson",
        role: "Marketing Director",
        company: "CreativeMinds Inc.",
        images: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1skcLpePGpSQDxcf2RWDQOp0dINOS4e9gDRlBlsXQaqz6bEWDSgZb7tU&s=10",
        quotes: "CloudShare has transformed how our team collaborated on creative assets. The secure sharing and intuitive interface have made file management a breeze.",
        rating: 5
    },
    {
        name: "Michael Chen",
        role: "Freelance Designer",
        company: "Self Employed",
        images: "https://harvardtechnologyreview.com/wp-content/uploads/2023/10/image.jpeg",
        quotes: "As a freelancer , I need to share a large design files with clients securely. Cloudshare's simple interface and reasonablee pricing make it my go to solution.",
        rating: 5
    },
    {
        name: "Priya Sharma",
        role: "Project Manager",
        company: "TechSolutions Ltd.",
        images: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3feqvqYeVsypv8EwuK0RvfISCKRYAQuBdQfoabM0lYCtXpOGC3UBRcNKh&s=10",
        quotes: "Managing project files across multiple teams used to be nightmare until we found CloudShare.Now everything is organised and accessible exactly when we need it.",
        rating: 4
    },
];


// Side menu bar data
export const SIDE_MENU_DATA = [{
        id: "01",
        label: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard",

    }, {
        id: "02",
        label: "Upload",
        icon: Upload,
        path: "/upload",

    },
    {
        id: "03",
        label: "My Files",
        icon: Files,
        path: "/my-files",

    },
    {
        id: "04",
        label: "Subscriptions",
        icon: CreditCard,
        path: "/subscriptions",

    },
    {
        id: "05",
        label: "Transactions",
        icon: Receipt,
        path: "/transactions",

    },
]