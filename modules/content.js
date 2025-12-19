import dbvLogo from '../assets/dbv.png';
import simtecLogo from '../assets/simtec.png';
import ugaLogo from '../assets/uga.png';
import ensimagLogo from '../assets/ensimag.png';
import lifeazLogo from '../assets/lifeaz.png';




export const content = {
    hero: {
        name: "Victorien MAMET",
        title: "Ingénieur R&D",
        subtitle: "Ingénieur-docteur de formation, expérimenté en physique, mécanique des fluides et informatique.",
        cta: "Voir mes articles"
    },
    about: {
        title: "À propos",
        description: "Ingénieur-docteur de formation et doté de dix ans d'expérience en tant qu'Ingénieur R&D, je suis intéressé par la recherche et l'optimisation de nouveaux procédés, par la transposition industrielle et le transfert de technologies de manière générale.\n\nJ'ai par exemple conçu et développé une mini-station météo pour la chambre de mes filles, en utilisant mes compétences pluridisciplinaires, des mathématiques à l'électronique en passant par la physique et l'informatique."
    },
    experience: [
        {
            role: "Ingénieur R&D",
            company: "Lifeaz",
            logo: lifeazLogo,
            period: "2022 - Présent",
            description: "Société de 40 personnes développant un défibrillateur connecté à destination des particuliers.\n\n**Conception et développement d'algorithmes de traitement pluridisciplinaires :**\n• Signaux ECG (détection de rythme cardiaque)\n• Données géospatiales (localisation, déplacement)\n• Données d'un parc d'appareils IoT\n\n**Autres missions :**\n• Création de modèles et simulateurs prédictifs énergétique pour la batterie.\n• Recherche industrielle sur un bracelet connecté (TRL1 -> TRL5) lutttant contre la mort subite du nourrisson.\n• Déploiement et maintenance cloud (GCP).\n• Électronique (métrologie, brasage, diagnostic)."
        },
        {
            role: "Ingénieur R&D",
            company: "DBV Technologies",
            logo: dbvLogo,
            period: "2019 - 2021",
            description: "Société de biotechnologies développant des patchs thérapeutiques. Projets autour de machines spéciales pour l'optimisation de la production.\n\n• Conception et qualification d'un logiciel pour vérification d'étalonnage de débitmètres.\n• Étude d'automate industriel (analyse de risques, simulateur électronique).\n• Traitement et analyse de données (images, production, matériaux)."
        },
        {
            role: "Ingénieur R&D Junior",
            company: "DBV Technologies",
            logo: dbvLogo,
            period: "2015 - 2018",
            description: "Travaux de doctorat CIFRE. Étude via modélisation multiphysique et simulation numérique d'un procédé de dépôt par spray.\n\n• Développement de prototype de modèle numérique et expériences comparatives.\n• Encadrement de stagiaire M1.\n• Publications : Physics of Fluids (09/2017), International Aerosol Conference 2018."
        },
        {
            role: "Assistant Ingénieur",
            company: "Simtec",
            logo: simtecLogo,
            period: "2014",
            description: "Stage de M1. Étude critique d'un code de simulation numérique.\n\n• Étude de l'environnement OpenFoam.\n• Rédaction d'un manuel simplifié d'OpenFoam."
        }
    ],
    education: [
        {
            degree: "Doctorat en physique",
            school: "UGA",
            logo: ugaLogo,
            period: "2015 - 2018",
            description: "Modélisation d'un électro-aérospray. Spécialités : Mécanique des fluides et génie des procédés."
        },
        {
            degree: "Diplôme d'ingénieur",
            school: "Ensimag",
            logo: ensimagLogo,
            period: "2012 - 2015",
            description: "Spécialités : Mathématiques appliquées et informatique."
        },
        {
            degree: "M.Sc. Applied Mathematics",
            school: "UGA",
            logo: ugaLogo,
            period: "2015",
            description: "MSIAM. Majeures : Optimisation complexe, traitement d'image avancé, transport optimal, ondelettes."
        },
        {
            degree: "CPGE",
            school: "Lycée Claude Gellée",
            period: "2009 - 2012",
            description: "Classes préparatoires MPSI puis MP*."
        }
    ],
    skills: [
        { name: "Gestion de projets", level: 4, max: 6 },
        { name: "Programmation", level: 3, max: 6 },
        { name: "Python", level: 4, max: 6 },
        { name: "Traitement de données", level: 4, max: 6 },
        { name: "Modélisation physique", level: 5, max: 6 }
    ],
    blogPosts: [],
    contact: {
        email: "victorien.mamet@gmail.com",
        location: "Arcueil, France"
    }
};

// Automatic Blog loader
const mdFiles = import.meta.glob('../blog/*.md', { query: '?raw', eager: true });

const parseFrontmatter = (fileContent) => {
    // Handle Windows CRLF by normalizing newlines first or strict regex
    // Easier to just match \r?\n
    const match = fileContent.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!match) return { attributes: {}, body: fileContent };

    const frontmatterBlock = match[1];
    const body = fileContent.replace(match[0], '').trim();

    const attributes = {};
    frontmatterBlock.split(/\r?\n/).forEach(line => {
        const [key, ...value] = line.split(':');
        if (key && value.length > 0) {
            attributes[key.trim()] = value.join(':').trim();
        }
    });

    return { attributes, body };
};

for (const path in mdFiles) {
    // mdFiles[path] is a module, because of Eager true, and '?raw' it returns { default: string }
    const rawContent = mdFiles[path].default;
    const { attributes, body } = parseFrontmatter(rawContent);

    if (attributes.id && attributes.title) {
        content.blogPosts.push({
            id: attributes.id,
            title: attributes.title,
            date: attributes.date,
            description: attributes.description,
            content: body
        });
    }
}
// Sort by date desc
content.blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
