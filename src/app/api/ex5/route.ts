import {
  Message as VercelChatMessage,
  StreamingTextResponse,
  createStreamDataTransformer,
} from "ai";
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { HttpResponseOutputParser } from "langchain/output_parsers";

import { JSONLoader } from "langchain/document_loaders/fs/json";
import { RunnableSequence } from "@langchain/core/runnables";
import { formatDocumentsAsString } from "langchain/util/document";
import { CharacterTextSplitter } from "langchain/text_splitter";

const loader = new JSONLoader("src/data/mishmi.json", [
  "/Anus",
  "/Ankle",
  "/Arm",
  "/Armpit",
  "/Background",
  "/Belly",
  "/Beard",
  "/Back side of neck",
  "/Bone",
  "/Blood",
  "/Body",
  "/Bone-Marrow",
  "/Breast",
  "/Brain",
  "/Bun",
  "/Buttock",
  "/Cartilage",
  "/Cheek",
  "/Calf",
  "/Chest",
  "/Chin",
  "/Clitoris",
  "/Clavicle",
  "/Dartos",
  "/Ear",
  "/Easia",
  "/Esophagus",
  "/Elbow",
  "/Eyebrow",
  "/Eye",
  "/Ear wax",
  "/Eye wax",
  "/Face",
  "/Forehead",
  "/Forearm",
  "/Finger",
  "/Fist",
  "/Gall bladder",
  "/Goiter",
  "/Gum",
  "/Hair",
  "/Head",
  "/Hand",
  "/Heel",
  "/Heart",
  "/Jaw",
  "/Knee",
  "/Kidney",
  "/Lap",
  "/Large intestine",
  "/Left",
  "/Leg",
  "/Little finger",
  "/Liver",
  "/Lung",
  "/Foot",
  "/Lock",
  "/Lip",
  "/Mouth",
  "/Mole",
  "/Muscle",
  "/Nail",
  "/Nose",
  "/Nipple",
  "/Navel",
  "/Neck",
  "/Pains",
  "/Pubic hair",
  "/Pore",
  "/Palate",
  "/Palm",
  "/Placenta",
  "/Pulse",
  "/Right",
  "/Rib",
  "/Rhinorrhea",
  "/Shoulder",
  "/Scapula",
  "/Stomach",
  "/Stool",
  "/Sternum",
  "/Sole",
  "/Saliva",
  "/Spleen",
  "/Sperm",
  "/Sputum/Cough",
  "/Skin",
  "/Small intestine",
  "/Sweat",
  "/Teeth",
  "/Tongue",
  "/Thumb",
  "/Thigh",
  "/Toe",
  "/Testis",
  "/Tests",
  "/Temple",
  "/Pulse",
  "/Urinary bladder",
  "/Nerve",
  "/Urine",
  "/Umbilical cord",
  "/Umbilicus",
  "/Vagina",
  "/Vein",
  "/Vertebral Column",
  "/Waist",
  "/Wrist",
  "/Wart",
  "/-",
  "/Acidities",
  "/Accident",
  "/Alopecia",
  "/Blind",
  "/Boil",
  "/Conjunctivitis",
  "/Cramp",
  "/Cancer",
  "/Carries/Gingivitis",
  "/Corn caps",
  "/Chicken pox",
  "/Dan drop",
  "/Disease",
  "/Dislocation",
  "/Deaf",
  "/Diarrhea",
  "/Dumb",
  "/Dysphasia",
  "/Dysentery",
  "/Dysnia",
  "/Earache (Otitis media)",
  "/Epic taxi us",
  "/Epiglottis",
  "/Fever",
  "/Fracture",
  "/Gastritis",
  "/Ging",
  "/Goitre",
  "/Heart attack",
  "/Headache",
  "/Hysteria",
  "/Influenza",
  "/Itching",
  "/Leprosy",
]);

export const dynamic = "force-dynamic";

/**
 * Formatter that formats message history for the translation prompt.
 */
const formatMessage = (message: VercelChatMessage) => {
  return `${message.role}: ${message.content}`;
};

// Define the translation template
const TEMPLATE = `First you greet the user properly. You are a translator for English and Mishmi words. Your task is to translate the provided words accurately. Just reply with the word after the colon. for e.g., "Ankle" "Taling". If user sends ankle, you send back taling. do that for other words too. "Anus": "Shelung", if they send "Shelung": send "Anus". 
you can combine the words if asked like this, if user sends chin chest, you send Maha Grong. Do that for others too. You can combine with english sentence like if the sender sends "I have leprosy". You reply "I have Amik: Klong". do this for all the other combination. it doesnt have to be just with " I have" it can be any english sentence. like what is an anus. or any other type of english sentence. if the user send "English sentence" + "Shelung". You reply back with "English sentence" + "Anus". follow this example. Dont reply bak the senders message. You can reply with english sentences and words if they have a word from the database. like shelung, anus, arm, leprosy etc.
avoid what is an ankle: what is a taling. Just reply back what is a taling. 

"Anus": "Shelung",
    "Ankle": "Taling",
    "Arm": "Haprih",
    "Armpit": "Klamuk",
    "Background": "Glok",
    "Belly": "Duk",
    "Beard": "Shamul",
    "Back side of neck": "Hungdak",
    "Bone": "Rak",
    "Blood": "Wei",
    "Body": "Seyai",
    "Bone-Marrow": "Hing",
    "Breast": "Chin",
    "Brain": "Nut",
    "Bun": "Fofee",
    "Buttock": "Thil tapum",
    "Cartilage": "Rak-ghrum",
    "Cheek": "Brup",
    "Calf": "Pla-Khan",
    "Chest": "Grong",
    "Chin": "Maha",
    "Clitoris": "Zat",
    "Clavicle": "Aphoh Taga",
    "Dartos": "Din oung",
    "Ear": "Eng(ing)",
    "Easia": "Ta-chah",
    "Esophagus": "Jhutbrang",
    "Elbow": "Rocg-Hanoung",
    "Eyebrow": "Mikbul",
    "Eye": "Mik",
    "Eyelid": "Mikgaup",
    "Ear wax": "Ink muh",
    "Eye wax": "Mik-Khae",
    "Face": "An-ngal",
    "Forehead": "Ow-wa",
    "Forearm": "Rocgpram",
    "Finger": "Rocgdung",
    "Fist": "Hatyaup",
    "Gall bladder": "Mud",
    "Goiter": "Paup",
    "Gum": "Shinal",
    "Hair": "Syam",
    "Head": "Kuo",
    "Hand": "Rocg",
    "Heel": "Pla Juoung",
    "Heart": "Lom",
    "Jaw": "Gai",
    "Knee": "Paapow",
    "Kidney": "Gun",
    "Lap": "Shovoo",
    "Large intestine": "Halai Kanaang",
    "Left": "Kowai",
    "Leg": "Pla",
    "Little finger": "Rocg Knee",
    "Liver": "Shoo",
    "Lung": "Shaow",
    "Foot": "Platupa",
    "Lock": "Syam Jog",
    "Lip": "Jhudal",
    "Mouth": "Jhuw",
    "Mole": "Moinyo",
    "Muscle": "Kanthi",
    "Nail": "Zig",
    "Nose": "Menyuong",
    "Nipple": "Duf",
    "Navel": "Aow",
    "Neck": "Hung",
    "Pains": "Yang",
    "Pubic hair": "Mul",
    "Pore": "Mutrom",
    "Palate":	"Jhuopduf",
"Palm":	"Rocg-Tapaa",
"Placenta":	"Saa-sap",
"Pulse":	"Fran",
"Right":	"Kayan",
"Rib":	"Brim",
"Rhinorrhea":	"Nyaup",
"Shoulder":	"Avno",
"Scapula":	"Kapalsih",
"Stomach":	"Phuko",
"Stool":	"Ta-khui",
"Sternum":	"Lom hanglat",
"Sole":	"Plajham",
"Saliva":	"Tathi",
"Spleen":	"Ta-play",
"Sperm":	"Yangkhui",
"Sputum/Cough":	"Khrah",
"Skin":	"Oung",
"Small intestine":	"Halai Katee",
"Sweat":	"Mut",
"Teeth":	"Shie",
"Tongue":	"Blai",
"Thumb":	"Ricgburn",
"Thigh":	"Ka-chuok",
"Toe":	"Plaburn",
"Testis":	"Din",
"Tests":	"Din seed",
"Temple":	"Eng-Khong",
"Pulse":	"Fran",
"Urinary bladder":	"Thachit",
"Nerve":	"Gyow",
"Urine":	"Tasit",
"Umbilical cord":	"Ow-Brang",
"Umbilicus":	"-",
"Vagina":	"Pu",
"Vein":	"Wee-jhuong",
"Vertebral Column":	"Brung",
"Waist":	"Ayol",
"Wrist":	"Rocgbai",
"Wart":	"Duot",
"-":	"Jhuw dup", dont hallucinate.
"Acidities":	"GlongDuk haang",
"Accident":	"Thanggi",
"Alopecia":	"Syam loh",
"Blind":	"Mik-Kambang",
"Boil":	"Ta-shan",
"Conjunctivitis":	"Mik-ram",
"Cramp":	"Pla-Anuong",
"Cancer":	"Gaeing",
"Carries/Gingivitis":	"Suekowng",
"Corn caps":	"Wamik",
"Chicken pox":	"Chamflab",
"Dan drop":	"Ku phut",
"Disease":	"Nath",
"Dislocation":	"Klat (Rog klat)",
"Deaf":	"Ink-Komboong (Kawa)",
"Diarrhea":	"Duk-kral",
"Dumb":	"Kah-tam",
"Dysphasia":	"Paapoth",
"Dysentery":	"Kaharklit",
"Dysnia":	"Sohji",
"Earache (Otitis media)":	"Tahpam",
"Epic taxi us":	"Minyong fow",
"Epiglottis":	"Paaplove",
"Fever":	"Kunai-Kurob",
"Fracture":	"Thl",
"Gastritis":	"Duk-haang",
"Ging":	"-",
"Goitre":	"Paup",
"Heart attack":	"See-tuo",
"Headache":	"Kuwnai",
"Hysteria":	"Kamowshak",
"Influenza":	"Biyok-Kalaai",
"Itching":	"Phung",
"Leprosy":	"Amik: Klong", 
  ==============================
  Context: {context}
  ==============================
  Current conversation: {chat_history}
  
  user: {question}
  assistant:`;

export async function POST(req: Request) {
  try {
    // Extract `messages` from the request body
    const { messages } = await req.json();

    const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
    const currentMessageContent = messages[messages.length - 1].content;

    const docs = await loader.load();

    // Create the translation prompt
    const prompt = PromptTemplate.fromTemplate(TEMPLATE);

    const model = new ChatOpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
      model: "gpt-3.5-turbo",
      temperature: 0,
      streaming: true,
      verbose: true,
    });

    // Output parser for streaming messages
    const parser = new HttpResponseOutputParser();

    const chain = RunnableSequence.from([
      {
        question: (input) => input.question,
        chat_history: (input) => input.chat_history,
        context: () => formatDocumentsAsString(docs),
      },
      prompt,
      model,
      parser,
    ]);

    // Convert the response into a friendly text stream
    const stream = await chain.stream({
      chat_history: formattedPreviousMessages.join("\n"),
      question: currentMessageContent,
    });

    // Respond with the stream
    return new StreamingTextResponse(
      stream.pipeThrough(createStreamDataTransformer())
    );
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: e.status ?? 500 });
  }
}
