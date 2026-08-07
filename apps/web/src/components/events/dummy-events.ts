import { EventType } from "@/components/events/types";
import { EVENT_TAGS } from "@/components/events/types";
import { SUBORGS } from "@/site.config";

export const DUMMY_EVENTS: EventType[] = [
    { 
        id: 0, 
        title: "ACM-W Workshop", 
        date: "2026-04-24T17:00:00-05:00", 
        location: "NPB", 
        status: "upcoming",
        description: "Join ACM-W for a technical workshop focused on career development and tech skills.",
        imageUrl: "/img/test_image.webp",
        tags: [EVENT_TAGS.ACMW, EVENT_TAGS.WORKSHOP]
    },
    { 
        id: 1, 
        title: "ITT: Game Dev", 
        date: "2026-04-25T18:00:00-05:00", 
        location: "NPB 1.202", 
        status: "upcoming",
        description: "Explore the world of game development with ITT.",
        imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        tags: [EVENT_TAGS.WORKSHOP]
    },
    { 
        id: 2, 
        title: "ICPC", 
        date: "2026-04-26T12:00:00-05:00", 
        location: "NPB 1.114", 
        status: "upcoming",
        description: "jdfjskdhfkj2342342rferetCompetitive programming practice session. ".repeat(30), // testing overflow
        imageUrl: "/img/photos/rhshirt.jpg",
        tags: [EVENT_TAGS.ICPC, EVENT_TAGS.WORKSHOP, EVENT_TAGS.WORKSHOP, EVENT_TAGS.CB, EVENT_TAGS.CB, EVENT_TAGS.CB, EVENT_TAGS.CB, EVENT_TAGS.CB, EVENT_TAGS.CB, EVENT_TAGS.CB]
    },
    { 
        id: 3, 
        title: "Painting Social", 
        date: "2026-04-27T10:00:00-05:00", 
        location: "Student Union", 
        status: "upcoming",
        description: "Relaxing painting session.",
        imageUrl: "/img/photos/bag.png",
        tags: [EVENT_TAGS.SOCIAL, EVENT_TAGS.CB, EVENT_TAGS.HACKATHON]
    },
    { 
        id: 4, 
        title: "Movie Social", 
        date: "2026-04-28T20:00:00-05:00", 
        location: "Retama", 
        status: "upcoming",
        description: "Join us for a movie night! " + "more words ".repeat(100), // testing overflow
        imageUrl: "img/photos/walrus.jpg",
        tags: [EVENT_TAGS.ACMW, EVENT_TAGS.CIC, EVENT_TAGS.RC, EVENT_TAGS.ICPC, EVENT_TAGS.ROWDYHACKS]
    },
    { 
        id: 5, 
        title: "RC Workathon", 
        date: "2026-04-29T14:00:00-05:00", 
        location: "NPB", 
        status: "upcoming",
        imageUrl: "/img/photos/shock.jpg",
        tags: [EVENT_TAGS.RC, EVENT_TAGS.WORKSHOP]
    },
    { 
        id: 6, 
        title: "CiC Workshop", 
        date: "2026-04-30T17:00:00-05:00", 
        location: "NPB", 
        status: "upcoming",
        imageUrl: "/img/photos/birdsup.png",
        tags: [EVENT_TAGS.CIC, EVENT_TAGS.WORKSHOP]
    },
    { 
        id: 7, 
        title: "CiC Workshop 2" + "long title ".repeat(10), 
        date: "2026-04-30T17:00:00-05:00", 
        location: "NPB", 
        status: "upcoming",
        imageUrl: "/img/photos/dinochess.jpg",
        tags: [EVENT_TAGS.CIC, EVENT_TAGS.WORKSHOP]
    }, 
    { 
        id: 8, 
        title: "ITT: How to Start Streaming" + "long title ".repeat(10), 
        date: "2026-05-01T17:00:00-05:00", 
        location: "NPB", 
        status: "upcoming",
        description: "That's my streamer! ".repeat(50),
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpesSrqJcPddgXogNFDkrpQZHZ2pO55BesqQ&s",
        tags: [EVENT_TAGS.CIC, EVENT_TAGS.WORKSHOP]
    },
    { 
        id: 9, 
        title: "Empty Event", 
        date: "",
        location: "", 
        status: "upcoming",
        description: "" 
    },
    { 
        id: 10, 
        title: "Empty Event", 
        date: "",
        location: "", 
        status: "upcoming",
        description: "" 
    },
    { 
        id: 11, 
        title: "Empty Event", 
        date: "",
        location: "", 
        status: "upcoming",
        description: "" 
    },
    { 
        id: 12, 
        title: "Empty Event", 
        date: "",
        location: "", 
        status: "upcoming",
        description: "" 
    },
    { 
        id: 13, 
        title: "Empty Event", 
        date: "",
        location: "", 
        status: "upcoming",
        description: "" 
    },
    { 
        id: 14, 
        title: "Empty Event", 
        date: "",
        location: "", 
        status: "upcoming",
        description: "" 
    },
    { 
        id: 15, 
        title: "Empty Event", 
        date: "",
        location: "", 
        status: "upcoming",
        description: "" 
    },
    { 
        id: 16, 
        title: "Empty Event", 
        date: "",
        location: "", 
        status: "upcoming",
        description: "" 
    },
    { 
        id: 17, 
        title: "Empty Event", 
        date: "",
        location: "", 
        status: "upcoming",
        description: "" 
    },
    { 
        id: 18, 
        title: "Empty Event", 
        date: "",
        location: "", 
        status: "upcoming",
        description: "" 
    },
    // testing more than 2 events on same day
    { 
        id: 19, 
        title: "CiC Workshop 3" + "long title ".repeat(10), 
        date: "2026-04-30T17:00:00-05:00", 
        location: "NPB", 
        status: "upcoming",
        imageUrl: "/img/photos/dinochess.jpg",
        tags: [EVENT_TAGS.CIC, EVENT_TAGS.WORKSHOP]
    }, 
    //testing page dots
    { 
        id: 20, 
        title: "CiC Workshop 3" + "long title ".repeat(10), 
        date: "2026-04-30T17:00:00-05:00", 
        location: "NPB", 
        status: "upcoming",
        imageUrl: "/img/photos/dinochess.jpg",
        tags: [EVENT_TAGS.CIC, EVENT_TAGS.WORKSHOP]
    }, 
    { 
        id: 21, 
        title: "CiC Workshop 3" + "long title ".repeat(10), 
        date: "2026-04-30T17:00:00-05:00", 
        location: "NPB", 
        status: "upcoming",
        imageUrl: "/img/photos/dinochess.jpg",
        tags: [EVENT_TAGS.CIC, EVENT_TAGS.WORKSHOP]
    }, 
    { 
        id: 22, 
        title: "CiC Workshop 3" + "long title ".repeat(10), 
        date: "2026-04-30T17:00:00-05:00", 
        location: "NPB", 
        status: "upcoming",
        imageUrl: "/img/photos/dinochess.jpg",
        tags: [EVENT_TAGS.CIC, EVENT_TAGS.WORKSHOP]
    }, 
    { 
        id: 23, 
        title: "CiC Workshop 3" + "long title ".repeat(10), 
        date: "2026-04-30T17:00:00-05:00", 
        location: "NPB", 
        status: "upcoming",
        imageUrl: "/img/photos/dinochess.jpg",
        tags: [EVENT_TAGS.CIC, EVENT_TAGS.WORKSHOP]
    }, 
    { 
        id: 24, 
        title: "CiC Workshop 3" + "long title ".repeat(10), 
        date: "2026-04-30T17:00:00-05:00", 
        location: "NPB", 
        status: "upcoming",
        imageUrl: "/img/photos/dinochess.jpg",
        tags: [EVENT_TAGS.CIC, EVENT_TAGS.WORKSHOP]
    }, 
    { 
        id: 25, 
        title: "CiC Workshop 3" + "long title ".repeat(10), 
        date: "2026-04-30T17:00:00-05:00", 
        location: "NPB", 
        status: "upcoming",
        imageUrl: "/img/photos/dinochess.jpg",
        tags: [EVENT_TAGS.CIC, EVENT_TAGS.WORKSHOP]
    }, 
    { 
        id: 26, 
        title: "CiC Workshop 3" + "long title ".repeat(10), 
        date: "2026-04-30T17:00:00-05:00", 
        location: "NPB", 
        status: "upcoming",
        imageUrl: "/img/photos/dinochess.jpg",
        tags: [EVENT_TAGS.CIC, EVENT_TAGS.WORKSHOP]
    }, 

    { 
        id: 27, 
        title: "CiC Workshop 3" + "long title ".repeat(10), 
        date: "2026-05-20T17:00:00-05:00", 
        location: "NPB", 
        status: "upcoming",
        imageUrl: "/img/photos/dinochess.jpg",
        tags: [EVENT_TAGS.CIC, EVENT_TAGS.WORKSHOP]
    }, 
    { 
        id: 28, 
        title: "CiC Workshop 3" + "long title ".repeat(10), 
        date: "2026-05-19T17:00:00-05:00", 
        location: "NPB", 
        status: "upcoming",
        imageUrl: "/img/photos/dinochess.jpg",
        tags: [EVENT_TAGS.CIC, EVENT_TAGS.WORKSHOP]
    }, 
    { 
        id: 29, 
        title: "CiC Workshop 3" + "long title ".repeat(10), 
        date: "2026-05-30T17:00:00-05:00", 
        location: "NPB", 
        status: "upcoming",
        imageUrl: "/img/photos/dinochess.jpg",
        tags: [EVENT_TAGS.CIC, EVENT_TAGS.WORKSHOP]
    }, 
    { 
        id: 30, 
        title: "CiC Workshop 3" + "long title ".repeat(10), 
        date: "2026-05-22T17:00:00-05:00", 
        location: "NPB", 
        status: "upcoming",
        imageUrl: "/img/photos/dinochess.jpg",
        tags: [EVENT_TAGS.CIC, EVENT_TAGS.WORKSHOP]
    }, 

    // past events testing
    { 
        id: 31, 
        title: "Rowdy CyberCon", 
        date: "2026-04-11T16:00:00-05:00", 
        location: "SP1", 
        status: "past",
        description: "",
        imageUrl: "https://www.rowdycybercon.org/_next/image?url=%2Fimg%2Flogo%2Frowdyconlogo.png&w=640&q=75",
        tags: [{label: "CyberJedis", color: "#233a70"}, // testing custom tags 
            {label: "WiCys", color: "#762c96"},
            EVENT_TAGS.HACKATHON, EVENT_TAGS.CB]
    },
    { 
        id: 32, 
        title: "Rec Field Social", 
        date: "2026-04-03T17:00:00-05:00", 
        location: "Field 2", 
        status: "past",
        description: "",
        imageUrl: "img/photos/dinogreen.jpg",
        tags: [EVENT_TAGS.CIC, EVENT_TAGS.SOCIAL]
    },
];