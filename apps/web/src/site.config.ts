export const SPONSORS = [
	{
		name: "HEB",
		logo: "/img/logos/sponsor/heb.png",
		link: "https://www.heb.com",
	},
	{
		name: "Dell",
		logo: "/img/logos/sponsor/dell.png",
		link: "https://www.dell.com",
	},
	{
		name: "Union Pacific",
		logo: "/img/logos/sponsor/unionPacific.png",
		link: "https://www.up.com",
	},
	{
		name: "UTSA CS",
		logo: "/img/logos/sponsor/utsacs.png",
		link: "https://caicc.utsa.edu/computer-science/",
	},
];

export type RGBColor = `rgb(${number}, ${number}, ${number})`;

export interface Suborg {
	name: string;
	slug: string;
	shortDesc: string;
	logoUrl: string;
	leadingSentence: string;
	colors: {
		poppy: RGBColor;
	};
	discordLink: string;
	aboutUs_One: string;
	aboutUs_Two: string;
	missionHead: string;
	mPhrase1: string;
	missionHead2: string;
	mPhrase2: string;
	missionHead3: string;
	mPhrase3: string;
	suborgemail: string;
}

export const SUBORGS: Record<string, Suborg> = {
	acmw: {
		slug: "acmw",
		colors: {
			poppy: "rgb(244, 137, 175)",
		},
		name: "ACM W",
		shortDesc: "Empowering Women in Tech",
		logoUrl: "/img/logos/suborgs/acmw-pink.png",
		leadingSentence:
			"We are the Association for Computing Machinery Women's Chapter at UTSA",
		missionHead: "Connect",
		mPhrase1:
			"Students get the opportunity to network with leaders in a field of similar interest",
		missionHead2: "Encourage",
		mPhrase2:
			"Empower students to pursue competitive career opportunities in computing fields",
		missionHead3: "Mentor",
		mPhrase3:
			"Students get the chance of mentorship to excel in their academic and professional goals",
		discordLink: "https://discord.com/invite/Fu86P2W8BK",
		aboutUs_One:
			"is an all-inclusive organization focused on tailoring its activities towards minorities.",
		aboutUs_Two:
			"aims to create an engaging academic, professional, and social network for women and minorities in technology.",
		suborgemail: "acmwteam@acmutsa.org",
	},
	rowdycreators: {
		slug: "rowdycreators",
		colors: {
			poppy: "rgb(2, 25, 54)",
		},
		name: "Rowdy Creators",
		shortDesc: "Develop. Create. Collaborate.",
		logoUrl: "/img/logos/suborgs/rc-blue.png",
		leadingSentence:
			"We are Rowdy Creators: A community of developers, designers, and creators at UTSA",
		missionHead: "Create",
		mPhrase1:
			"Students get the chance to create long term projects of their choice",
		missionHead2: "Collaborate",
		mPhrase2:
			"Work together in groups or solo to create an excelling project",
		missionHead3: "Showcase",
		mPhrase3:
			"Students get the opportunity to display their wonderful projects to their peers",
		discordLink: "https://discord.com/invite/gvqbjZU",
		aboutUs_One:
			"gives students interested in technology the opportunity to learn new skills, network with other students, and create/develop hands-on projects.",
		aboutUs_Two:
			"channels the skills of various disciplines (Engineering, Computer Science, Business, etc.) into technology projects using software and/or hardware.",
		suborgemail: "team@rowdycreators.org",
	},
	acmicpc: {
		slug: "acm icpc",
		colors: {
			poppy: "rgb(65, 137, 93)",
		},
		name: "ICPC",
		shortDesc: "Compete in Competitive Programming",
		logoUrl: "/img/logos/suborgs/icpc-green.png",
		leadingSentence:
			"We are ACM ICPC: A community of competitve programmers striving for achievement",
		missionHead: "Participate",
		mPhrase1: "Join us in tackling competitive Leet Code problems",
		missionHead2: "Compete",
		mPhrase2: "Partake in ICPC competitions",
		missionHead3: "Achieve",
		mPhrase3:
			"Win at competitions, gain recognition, and enhance career opportunities",
		discordLink: "https://discord.com/invite/qfckfeQ",
		aboutUs_One:
			"or International Collegiate Programming Contest, is a world-wide programming contest where thousands of 3-person teams compete. Moreover, ",
		aboutUs_Two:
			"provides the opportunity for students to learn and prepare for the contest.",
		suborgemail: "team@acmutsa.org",
	},
	codingincolor: {
		slug: "coding in color",
		colors: {
			poppy: "rgb(40, 40, 40)",
		},
		name: "Coding In Color",
		shortDesc: "A safe space for black people in the technology world",
		logoUrl: "/img/logos/suborgs/cnc-gray.png",
		leadingSentence:
			"Coding in Color, a safe community for black people to advance together in the technical world",
		missionHead: "Connect",
		mPhrase1:
			"Students get the opportunity to network with leaders in a field of similar interest",
		missionHead2: "Professional Development",
		mPhrase2:
			"Equitable access to job and career opportunities through educational workshops",
		missionHead3: "Community",
		mPhrase3:
			"A healthy learning environment is essential for personal growth",
		discordLink: "https://discord.gg/gNXxZfxxK5",
		aboutUs_One:
			"strives to create a safe space for black people in the technology world to promote representation in our community.",
		aboutUs_Two:
			"provides opportunities to people through workshops, events, and networking events",
		suborgemail: "team@cicutsa.org",
	},
	rowdyhacks: {
		slug: "rowdyhacks",
		colors: {
			poppy: "rgb(197, 125, 58)",
		},
		name: "Rowdy Hacks",
		shortDesc: "An Annual Fall Hackathon",
		logoUrl: "/img/logos/hackathons/rh-orange.png",
		leadingSentence:
			"Rowdy Hacks, a competitive hackathon that promotes creativity, intelligence, and teamwork",
		missionHead: "Connect",
		mPhrase1:
			"Students get the opportunity to network with peers, learn, and grow together",
		missionHead2: "Resume Builder",
		mPhrase2:
			"A phenomenal project gives students the opportunity to shine in front of sponsors and start elevating their resumes.",
		missionHead3: "Prizes",
		mPhrase3:
			"Students teams get to compete against other teams for valuable and rare prizes",
		discordLink: "https://discord.com/invite/FzFEZBRmhr",
		aboutUs_One:
			"is UTSA's annual hackathon, hosted by the Association for Computing Machinery (ACM) at UTSA.",
		aboutUs_Two:
			"is a weekend-long event where students, tech enthusiasts, and creative minds from all backgrounds come together to collaborate, innovate, and build real-world projects in 24 hours.",
		suborgemail: "team@rowdyhacks.org",
	},
};
