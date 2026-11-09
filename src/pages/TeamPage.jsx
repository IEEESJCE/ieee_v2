import { useState, useEffect, useRef } from "react";
import { current_team_photo } from "../components/team_photo";
import "../styles/team.css";

/* ─── Category config & Division Order ─── */
const DIVISION_ORDER = [
  "executive_committee",
  "membership_development_committee",
  "electron_devices_society",
  "robotics_and_automation_society",
  "signal_processing_society",
  "aerospace_and_electronic_systems_society",
  "women_in_engineering",
  "editorial_board",
  "web_development_board",
];

const CATEGORIES = [
  { key: "all", label: "All", color: "#2563EB" },
  {
    key: "executive_committee",
    label: "Executive Committee",
    color: "#2563EB",
  },
  { key: "membership_development_committee", label: "MDC", color: "#0EA5E9" },
  {
    key: "electron_devices_society",
    label: "EDS",
    color: "#0284C7",
  },
  {
    key: "robotics_and_automation_society",
    label: "RAS",
    color: "#1D4ED8",
  },
  {
    key: "signal_processing_society",
    label: "SPS",
    color: "#0369A1",
  },
  {
    key: "aerospace_and_electronic_systems_society",
    label: "AESS",
    color: "#6366F1",
  },
  { key: "women_in_engineering", label: "WIE", color: "#4F46E5" },
  { key: "editorial_board", label: "Editorial", color: "#1E3A8A" },
  { key: "web_development_board", label: "Web Dev Board", color: "#1E3A8A" },
];
const CAT_MAP = Object.fromEntries(CATEGORIES.map((c) => [c.key, c]));
const CAT_DISPLAY = {
  executive_committee: "Executive Committee",
  membership_development_committee: "Membership Development Committee",
  signal_processing_society: "Signal Processing Society",
  robotics_and_automation_society: "Robotics & Automation Society",
  electron_devices_society: "Electron Devices Society",
  aerospace_and_electronic_systems_society:
    "Aerospace & Electronic Systems Society",
  women_in_engineering: "Women in Engineering",
  editorial_board: "Editorial Board",
  web_development_board: "Web Development Board",
};

/* ─── Current Executive Committee (Updated Roster) ─── */
const CURRENT_EXECUTIVE_COMMITTEE = [
  {
    name: "Rachit Jain",
    post: "CHAIRPERSON",
    src: "/photos/members25-26/Rachit Jain.jpg",
    linkedin: "https://in.linkedin.com/in/rachit-jain-b91a90364",
    gmail: "nprachit84@gmail.com",
  },
  {
    name: "Ankith Kaushik",
    post: "VICE CHAIRPERSON",
    src: "/photos/members25-26/Ankith Kaushik.jpeg",
    linkedin: "https://www.linkedin.com/in/ankith-kaushik-222339328",
    gmail: "ankithkaushik2005@gmail.com",
  },
  {
    name: "Keerthana R Nair",
    post: "GENERAL SECRETARY",
    src: "/photos/members25-26/WhatsApp Image 2026-02-26 at 13.49.22.jpeg",
    linkedin: "https://www.linkedin.com/in/keerthana-r-nair-304b8a2aa",
    gmail: "Keerthanarn05@gmail.com",
  },
  {
    name: "Dhanalakshmi R Pagade",
    post: "PUBLICITY LEAD",
    src: "/photos/members25-26/DhanalakshmiRP.jpg",
    linkedin: "https://www.linkedin.com/in/dhanalakshmi-rl-pagade-129488292",
    gmail: "dhanalakshmirpagade@gmail.com",
  },
  {
    name: "Apoorva H N",
    post: "PUBLICITY CO-LEAD",
    src: "/photos/members25-26/Apoorva H N.jpg",
    linkedin: "https://www.linkedin.com/in/apoorva-h-n-9b7b542b1",
    gmail: "hmapoorvahn@gmail.com",
  },
  {
    name: "Arjun A Bharadwaj",
    post: "STUDENT ACTIVITY COORDINATOR",
    src: "/photos/members25-26/arjun.jpeg",
    linkedin: "https://www.linkedin.com/in/arjun-a-bharadwaj-8a9487292",
    gmail: "arjun.bharadwaj2005@gmail.com",
  },
  {
    name: "Pallavi S",
    post: "STUDENT ACTIVITY COORDINATOR",
    src: "/photos/members25-26/Pallavi S.jpg",
    linkedin: "https://www.linkedin.com/in/pallavis21",
    gmail: "pallavis2125@gmail.com",
  },
  {
    name: "Alvisha Florine Veigas",
    post: "REPORTING LEAD",
    src: "/photos/members25-26/Alvisha.jpg",
    linkedin: "https://linkedin.com/in/alvishaflorineveigas2805",
    gmail: "alvishaveigas@gmail.com",
  },
  {
    name: "Vruddhi Dinesh",
    post: "EVENT MANAGER",
    src: "/photos/members25-26/vruddhi.jpg",
    linkedin: "https://www.linkedin.com/in/vruddhi-dinesh-085867282",
    gmail: "vruddhidinesh@gmail.com",
  },
  {
    name: "Suthej Sunil",
    post: "Chair-Elect",
    src: "/photos/members26-27/Suthej_S.jpg",
    linkedin: "https://www.linkedin.com/in/suthejs",
    gmail: "suthejsunil2020@gmail.com",
    imageStyle: {
      transform: "scale(2.2) translateZ(0)",
      transformOrigin: "center 39%",
    },
  },
  {
    name: "Tilak K S",
    post: "Treasurer",
    src: "/photos/members26-27/Tilak_K_S.jpg",
    linkedin: "https://www.linkedin.com/in/tilak-k-s-b5a40439a",
    gmail: "tilakks0205@gmail.com",
    imageStyle: {
      transform: "scale(1.4) translateZ(0)",
      transformOrigin: "center 50%",
    },
  },
  {
    name: "Lalitha M N",
    post: "Chief Student Coordinator",
    src: "/photos/members26-27/Lalitha_M_N.jpg",
    linkedin: "https://www.linkedin.com/in/lalitha-m-n-2820093aa",
    gmail: "lalithamn3@gmail.com",
    imageStyle: {
      transform: "scale(1.7) translateZ(0)",
      transformOrigin: "center 79%",
    },
  },
  {
    name: "Pruthvi Shree",
    post: "Publicity Coordinator",
    src: "/photos/members26-27/Pruthvi_Shree.jpg",
    linkedin: "https://www.linkedin.com/in/pruthvi-shree-80625236a",
    gmail: "pruthvishreelokesha@gmail.com",
    imageStyle: {
      transform: "scale(1.9) translateZ(0)",
      transformOrigin: "center 32%",
    },
  },
  {
    name: "Mayuri Kulkarni",
    post: "Publicity Coordinator",
    src: "/photos/members26-27/Mayuri_Kulkarni.jpg",
    linkedin: "https://www.linkedin.com/in/mayuri-kulkarni-635a75327",
    gmail: "mayurikulkarni1609@gmail.com",
    imageStyle: {
      transform: "scale(1.9) translateZ(0)",
      transformOrigin: "center 32%",
    },
  },
  {
    name: "Holika P",
    post: "Student Coordinator",
    src: "/photos/members26-27/Holika_P.jpg",
    linkedin: "https://www.linkedin.com/in/holika-p-330452333",
    gmail: "holikaprakash@gmail.com",
    imageStyle: {
      transform: "scale(2) translateZ(0)",
      transformOrigin: "center 62%",
    },
  },
  {
    name: "Aprameya P",
    post: "Student Coordinator",
    src: "/photos/members26-27/Aprameya_P.jpg",
    linkedin: "https://www.linkedin.com/in/aprameya-p-b0768a330",
    gmail: "aprameyapilinguli@gmail.com",
    imageStyle: {
      transform: "scale(1.8) translateZ(0)",
      transformOrigin: "center 25%",
    },
  },
  {
    name: "Meghana I S",
    post: "Reporter",
    src: "/photos/members26-27/Meghana_I_S.jpg",
    linkedin: "https://www.linkedin.com/in/meghana-i-s-7aa276387",
    gmail: "ismeghana14@gmail.com",
    imageStyle: {
      transform: "scale(1.8) translateZ(0)",
      transformOrigin: "center 25%",
    },
  },
  {
    name: "Ruchitha S",
    post: "Reporter",
    src: "",
    linkedin: "https://www.linkedin.com/in/ruchitha-s-bb33203a0",
    gmail: "ruchisrini13@gmail.com",
  },
];

/* ─── Membership Development Committee (Updated Roster) ─── */
const MEMBERSHIP_DEVELOPMENT_COMMITTEE = [
  {
    name: "Varsha Lakshmi K",
    post: "CHAIRPERSON",
    type: "membership_development_committee",
    src: "/photos/members25-26/Varsha Lakshmi K.jpg",
    linkedin: "https://www.linkedin.com/in/varsha-lakshmi-k-7159b22ab",
    gmail: "varshalakshmik@gmail.com",
  },
  {
    name: "Sukruthi Rao",
    post: "VICE CHAIRPERSON",
    type: "membership_development_committee",
    src: "/photos/members25-26/Sukruthi Rao.jpg",
    linkedin: "https://www.linkedin.com/in/sukruthi-rao-923627313",
    gmail: "sukruthirao03@gmail.com",
  },
  {
    name: "Vishwas A Gowda",
    post: "Secretary",
    type: "membership_development_committee",
    src: "/photos/members26-27/Vishwas_A_Gowda.jpg",
    linkedin: "https://www.linkedin.com/in/vishwas-a-gowda",
    gmail: "vishwasgowda13@gmail.com",
    imageStyle: {
      transform: "scale(1.8) translateZ(0) translateX(-3px)",
      transformOrigin: "center 3%",
    },
  },
  {
    name: "Adithi BS",
    post: "SBMDC Ambassador",
    type: "membership_development_committee",
    src: "/photos/members26-27/Adithi_BS.jpg",
    linkedin: "https://www.linkedin.com/in/adithi-bs-78270039a",
    gmail: "adithibs720@gmail.com",
  },
];

/* ─── Signal Processing Society (Updated Roster) ─── */
const SIGNAL_PROCESSING_SOCIETY = [
  {
    name: "Rahul Murali",
    post: "CHAIRPERSON",
    type: "signal_processing_society",
    src: "/photos/members25-26/Rahul Murali.jpg",
    linkedin: "https://www.linkedin.com/in/rahul-murali-405677335",
    gmail: "muralirahul6210@gmail.com",
  },
  {
    name: "Shravan Krishna",
    post: "VICE CHAIRPERSON",
    type: "signal_processing_society",
    src: "/photos/members25-26/Shravan Krishna.jpg",
    linkedin: "https://www.linkedin.com/in/shravan-krishna-0a4486292",
    gmail: "shravankrishna2018@gmail.com",
  },
  {
    name: "Muskan",
    post: "SENIOR TECHNICAL COORDINATOR",
    type: "signal_processing_society",
    src: "/photos/members25-26/Muskan fayaz.jpg",
    linkedin: "https://www.linkedin.com/in/muskan-fayaz-52757b306",
    gmail: "muskanfayaz48@gmail.com",
  },
  {
    name: "Jeevashree G",
    post: "SECRETARY",
    type: "signal_processing_society",
    src: "/photos/members26-27/Jeevashree_G.jpg",
    linkedin: "https://www.linkedin.com/in/jeevashree-g-b7294133a",
    gmail: "jeevashree0210@gmail.com",
    imageStyle: {
      transform: "scale(1.9) translateZ(0)",
      transformOrigin: "center 56%",
    },
  },
  {
    name: "Veeresh Katnur",
    post: "JOINT SECRETARY",
    type: "signal_processing_society",
    src: "/photos/members26-27/Veeresh_Katnur.jpg",
    linkedin: "https://www.linkedin.com/in/veeresh-katnur-332197442",
    gmail: "veereshkatnur01@gmail.com",
    imageStyle: {
      transform: "scale(1.6) translateZ(0)",
      transformOrigin: "center 16%",
    },
  },
  {
    name: "Priya N Madanbhavi",
    post: "TREASURER",
    type: "signal_processing_society",
    src: "",
    linkedin: "https://www.linkedin.com/in/priya-madanbhavi",
    gmail: "madanbhavip@gmail.com",
  },
  {
    name: "Manogna S",
    post: "TECHNICAL COORDINATOR",
    type: "signal_processing_society",
    src: "/photos/members26-27/Manogna_S.jpg",
    linkedin: "https://www.linkedin.com/in/manogna-s-b7553541b",
    gmail: "manogna973@gmail.com",
    imageStyle: {
      transform: "scale(1.8) translateZ(0) translateX(-3px)",
      transformOrigin: "center 32%",
    },
  },
];

/* ─── Robotics and Automation Society (Updated Roster) ─── */
const ROBOTICS_AND_AUTOMATION_SOCIETY = [
  {
    name: "Prithveesh Rao",
    post: "CHAIRPERSON",
    type: "robotics_and_automation_society",
    src: "/photos/members25-26/Prithveesh Rao.jpeg",
    linkedin: "https://www.linkedin.com/in/prithveesh-rao-4345521a1",
    gmail: "raoprithveesh@gmail.com",
  },
  {
    name: "Chinmay G C",
    post: "VICE CHAIRPERSON",
    type: "robotics_and_automation_society",
    src: "/photos/members26-27/Chinmay G C.jpg",
    linkedin: "https://www.linkedin.com/in/chinmay-gc",
    gmail: "chinmaygchandramouli@gmail.com",
    imageStyle: {
      transform: "scale(1.5) translateZ(0)",
      transformOrigin: "center 47%",
    },
  },
  {
    name: "Rohan A S Gowda",
    post: "SENIOR TECHNICAL COORDINATOR",
    type: "robotics_and_automation_society",
    src: "/photos/members25-26/Rohan A S Gowda.jpg",
    linkedin: "https://www.linkedin.com/in/rohan-a-s-gowda-b27580292",
    gmail: "rohanasgowda7411@gmail.com",
  },
  {
    name: "Adhya Bhat M",
    post: "SECRETARY",
    type: "robotics_and_automation_society",
    src: "/photos/members26-27/Adhya_Bhat_M.jpg",
    linkedin: "https://www.linkedin.com/in/adhya-bhat-m/",
    gmail: "adhya.bhat@gmail.com",
    imageStyle: {
      transform: "scale(1.9) translateZ(0)",
      transformOrigin: "center 53%",
    },
  },
  {
    name: "Diya Y Bhandarkar",
    post: "JOINT SECRETARY",
    type: "robotics_and_automation_society",
    src: "/photos/members26-27/Diya_Y_Bhandarkar.jpg",
    linkedin: "https://www.linkedin.com/in/diya-y-bhandarkar",
    gmail: "diyaybhandarkar@gmail.com",
    imageStyle: {
      transform: "scale(1.9) translateZ(0)",
      transformOrigin: "center 53%",
    },
  },
  {
    name: "Sagar M L",
    post: "TECHNICAL COORDINATOR",
    type: "robotics_and_automation_society",
    src: "/photos/members26-27/Sagar_M_L.jpg",
    linkedin: "https://www.linkedin.com/in/sagar-m-l-0b9311438",
    gmail: "sagarml777@gmail.com",
    imageStyle: {
      transform: "scale(1.9) translateZ(0)",
      transformOrigin: "center 53%",
    },
  },
];

/* ─── Electron Devices Society (Updated Roster) ─── */
const ELECTRON_DEVICES_SOCIETY = [
  {
    name: "Pramathi H B",
    post: "CHAIRPERSON",
    type: "electron_devices_society",
    src: "/photos/members25-26/Pramathi H.B.jpg",
    linkedin: "https://www.linkedin.com/in/pramathi-h-b-808487292",
    gmail: "pramathi1805@gmail.com",
  },
  {
    name: "Harshith A R",
    post: "VICE CHAIRPERSON",
    type: "electron_devices_society",
    src: "/photos/members25-26/harshith ar.JPG",
    linkedin: "https://www.linkedin.com/in/harshi76",
    gmail: "arharshi9535@gmail.com",
  },
  {
    name: "Sachin K S",
    post: "SENIOR TECHNICAL COORDINATOR",
    type: "electron_devices_society",
    src: "/photos/members25-26/Sachin K.S.jpg",
    linkedin: "https://www.linkedin.com/in/sachinks21",
    gmail: "kssachin42@gmail.com",
  },
  {
    name: "Nimai Udupi",
    post: "SECRETARY",
    type: "electron_devices_society",
    src: "/photos/members26-27/Nimai_Udupi.jpg",
    linkedin: "https://www.linkedin.com/in/nimai-u-7531bb3a9",
    gmail: "nimai08.u@gmail.com",
    imageStyle: {
      transform: "scale(1.8) translateZ(0)",
      transformOrigin: "center 40%",
    },
  },
  {
    name: "Aadhira M",
    post: "JOINT SECRETARY",
    type: "electron_devices_society",
    src: "/photos/members26-27/Aadhira_M.jpg",
    linkedin: "https://www.linkedin.com/in/aadhira-m-4712a8372/",
    gmail: "fly2aadhi@gmail.com",
    imageStyle: {
      transform: "scale(1.8) translateZ(0)",
      transformOrigin: "center 40%",
    },
  },
  {
    name: "Hemanth B Kumar",
    post: "TECHNICAL COORDINATOR",
    type: "electron_devices_society",
    src: "/photos/members26-27/Hemanth_B_Kumar.jpg",
    linkedin: "https://www.linkedin.com/in/hemanth-b-kumar-a12057430",
    gmail: "hbkumar4506@gmail.com",
    imageStyle: {
      transform: "scale(1.8) translateZ(0)",
      transformOrigin: "center 40%",
    },
  },
];

/* ─── Women in Engineering (Updated Roster) ─── */
const WOMEN_IN_ENGINEERING = [
  {
    name: "Anagha V. Bhat",
    post: "CHAIRPERSON",
    type: "women_in_engineering",
    src: "/photos/members25-26/Anagha V Bhat.jpeg",
    linkedin: "http://linkedin.com/in/anagha-v-bhat-012195361",
    gmail: "anaghavbhat13@gmail.com",
  },
  {
    name: "Pratham M S",
    post: "VICE CHAIRPERSON",
    type: "women_in_engineering",
    src: "/photos/members25-26/Pratham MS.jpeg",
    linkedin: "http://www.linkedin.com/in/pratham-ms-1312i",
    gmail: "prathamms01@gmail.com",
  },
  {
    name: "Dhanya B",
    post: "SENIOR TECHNICAL COORDINATOR",
    type: "women_in_engineering",
    src: "/photos/members25-26/DhanyaBGowda.jpg",
    linkedin: "https://www.linkedin.com/in/dhanya-b-146755360",
    gmail: "iamdhanyab2525@gmail.com",
  },
  {
    name: "Apoorva Raveendra Bhat",
    post: "SECRETARY",
    type: "women_in_engineering",
    src: "/photos/members26-27/Apoorva_R_Bhat.jpg",
    linkedin: "https://www.linkedin.com/in/apoorva-r-bhat",
    gmail: "apoorvabhat123@gmail.com",
    imageStyle: {
      transform: "scale(1.8) translateZ(0)",
      transformOrigin: "center 32%",
    },
  },
  {
    name: "S K Gouthami",
    post: "JOINT SECRETARY",
    type: "women_in_engineering",
    src: "/photos/members26-27/S_K_Gouthami.jpg",
    linkedin: "https://www.linkedin.com/in/s-k-gouthami",
    gmail: "gouthamikarunanidhi@gmail.com",
    imageStyle: {
      transform: "scale(1.8) translateZ(0)",
      transformOrigin: "center 32%",
    },
  },
  {
    name: "Arpitha N",
    post: "TECHNICAL COORDINATOR",
    type: "women_in_engineering",
    src: "/photos/members26-27/Arpitha_N.jpg",
    linkedin: "https://www.linkedin.com/in/arpitha-n-215937331",
    gmail: "arpithan217@gmail.com",
    imageStyle: {
      transform: "scale(1.8) translateZ(0)",
      transformOrigin: "center 32%",
    },
  },
];

/* ─── Editorial Board (Updated Roster) ─── */
const EDITORIAL_BOARD = [
  {
    name: "Mythri G",
    post: "CHAIRPERSON",
    type: "editorial_board",
    src: "/photos/members25-26/Mythri G.jpg",
    linkedin: "https://www.linkedin.com/in/mythri-g-285546330",
    gmail: "mythrig2005@gmail.com",
  },
  {
    name: "Shalini H R",
    post: "VICE CHAIRPERSON",
    type: "editorial_board",
    src: "/photos/members25-26/Shalini.jpeg",
    linkedin: "https://www.linkedin.com/in/shalini-h-r-15092005shr",
    gmail: "shalinihr2005@gmail.com",
  },
  {
    name: "Likhitha S A",
    post: "SENIOR EDITOR",
    type: "editorial_board",
    src: "/photos/members25-26/LikhithaSA.webp",
    linkedin: "https://www.linkedin.com/in/likhitha-s-a-1b90652a2",
    gmail: "likhithasasa@gmail.com",
  },
  {
    name: "Sushma M",
    post: "SENIOR EDITOR",
    type: "editorial_board",
    src: "/photos/members25-26/Sushma.jpg",
    linkedin: "https://www.linkedin.com/in/sushma-m-429034339",
    gmail: "sushs0305@gmail.com",
  },
  {
    name: "Bhavana G",
    post: "Graphic Designer",
    type: "editorial_board",
    src: "/photos/members26-27/Bhavana_G.jpg",
    linkedin: "https://www.linkedin.com/in/bhavana-galebhe",
    gmail: "bhavanagalebhe20@gmail.com",
    imageStyle: {
      transform: "scale(1.9) translateZ(0)",
      transformOrigin: "center 61%",
    },
  },
  {
    name: "U.L Rini Linnet",
    post: "Graphic Designer",
    type: "editorial_board",
    src: "/photos/members26-27/U.L_Rini_Linnet.jpg",
    linkedin: "https://www.linkedin.com/in/rini-linnet-761888351/",
    gmail: "rinilinnet@gmail.com",
    imageStyle: {
      transform: "scale(1.8) translateZ(0)",
      transformOrigin: "center 35%",
    },
  },
  {
    name: "Shreeja Dimri",
    post: "Editor",
    type: "editorial_board",
    src: "/photos/members26-27/Shreeja_Dimri.jpg",
    linkedin: "https://www.linkedin.com/in/shreeja-dimri-a04619363?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    gmail: "shreeja614@gmail.com",
    imageStyle: {
      transform: "scale(1.8) translateZ(0) translateX(-5px)",
      transformOrigin: "center 50%",
    },
  },
  {
    name: "Samhita KS",
    post: "Editor",
    type: "editorial_board",
    src: "/photos/members26-27/Samhita_KS.jpg",
    linkedin: "https://www.linkedin.com/in/samhita-ks",
    gmail: "samhitakssri@gmail.com",
    imageStyle: {
      transform: "scale(1.8) translateZ(0) translateX(-5px)",
      transformOrigin: "center 50%",
    },
  },
];

/* ─── Aerospace and Electronic Systems Society (Updated Roster) ─── */
const AEROSPACE_AND_ELECTRONIC_SYSTEMS_SOCIETY = [
  {
    name: "Varun Kilkile",
    post: "CHAIRPERSON",
    type: "aerospace_and_electronic_systems_society",
    src: "/photos/members26-27/Varun_Kilkile.jpg",
    linkedin: "https://www.linkedin.com/in/varun-kilkile-5442a8393",
    gmail: "varun04kilkile@gmail.com",
    imageStyle: {
      transform: "scale(1.3) translateZ(0)",
      transformOrigin: "center -3%",
    },
  },
  {
    name: "Thanmayi B V",
    post: "VICE CHAIRPERSON",
    type: "aerospace_and_electronic_systems_society",
    src: "/photos/members26-27/Thanmayi_B_V.jpg",
    linkedin: "https://www.linkedin.com/in/thanmayi-bv-094005378",
    gmail: "thanmayibv111@gmail.com",
    imageStyle: {
      transform: "scale(1.8) translateZ(0)",
      transformOrigin: "center 38%",
    },
  },
  {
    name: "Lakshmi K L",
    post: "SECRETARY",
    type: "aerospace_and_electronic_systems_society",
    src: "/photos/members26-27/Lakshmi_K_L.jpg",
    linkedin: "https://www.linkedin.com/in/lakshmi-k-l-18215735b/",
    gmail: "sanjana.2262006@gmail.com",
    imageStyle: {
      transform: "scale(1.8) translateZ(0)",
      transformOrigin: "center 38%",
    },
  },
  {
    name: "Vishal H V",
    post: "JOINT SECRETARY",
    type: "aerospace_and_electronic_systems_society",
    src: "",
    linkedin: "https://www.linkedin.com/in/vishal-hv-912a9833b?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    gmail: "vishalhv06@gmail.com",
  },
  {
    name: "Maryada Sudharshan Ulagadde",
    post: "TREASURER",
    type: "aerospace_and_electronic_systems_society",
    src: "/photos/members26-27/Maryada_Sudarshan_Ulagadde.jpg",
    linkedin: "https://www.linkedin.com/in/maryada-ulagadde-745399379",
    gmail: "maryadaulagadde@gmail.com",
    imageStyle: {
      transform: "scale(1.8) translateZ(0)",
      transformOrigin: "center 38%",
    },
  },
  {
    name: "Tejas S",
    post: "TECHNICAL COORDINATOR",
    type: "aerospace_and_electronic_systems_society",
    src: "/photos/members26-27/Thejas_S.jpg",
    linkedin: "https://www.linkedin.com/in/thejas-shreenivas",
    gmail: "thejaskashyap3141@gmail.com",
    imageStyle: {
      transform: "scale(1.3) translateZ(0)",
      transformOrigin: "center -3%",
    },
  },
];

/* ─── Web Development Board ─── */
const WEB_DEVELOPMENT_BOARD = [
  {
    name: "Rajath R Prasad",
    post: "CHAIRPERSON",
    type: "web_development_board",
    src: "/photos/members25-26/RajathRP.jpg",
    linkedin: "https://www.linkedin.com/in/rajath-r-prasad",
    gmail: "rajath2010rrp@gmail.com",
  },
  {
    name: "Deekshith S Kumar",
    post: "WEBMASTER",
    type: "web_development_board",
    src: "/photos/members26-27/Deekshith_S_Kumar.jpg",
    linkedin: "https://www.linkedin.com/in/deekshith-s-kumar-a9062a245/",
    gmail: "deekshithskumar2005@gmail.com",
    imageStyle: {
      transform: "scale(1.7) translateZ(0)",
      transformOrigin: "center 38%",
    },
  },
  {
    name: "Amruth",
    post: "WEBMASTER",
    type: "web_development_board",
    src: "/photos/members26-27/Amruth.jpg",
    linkedin: "https://www.linkedin.com/in/amruth-s-798090126?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    gmail: "amruthshivu@gmail.com",
  },
];

const CURRENT_TEAM = [
  ...CURRENT_EXECUTIVE_COMMITTEE.map((m) => ({
    ...m,
    type: "executive_committee",
  })),
  ...MEMBERSHIP_DEVELOPMENT_COMMITTEE,
  ...ELECTRON_DEVICES_SOCIETY,
  ...ROBOTICS_AND_AUTOMATION_SOCIETY,
  ...SIGNAL_PROCESSING_SOCIETY,
  ...AEROSPACE_AND_ELECTRONIC_SYSTEMS_SOCIETY,
  ...WOMEN_IN_ENGINEERING,
  ...EDITORIAL_BOARD,
  ...WEB_DEVELOPMENT_BOARD,
];

/* ─── Icons ─── */
function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );
}

/* ─── Ultra-Sharp High-Performance Photo ─── */
function LazyPhoto({ src, alt, imageStyle }) {
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    setLoaded(false);
    setHasError(false);
    // Instant cache-hit detection: if browser has already loaded it, show immediately
    if (imgRef.current && imgRef.current.complete) {
      if (imgRef.current.naturalWidth > 0) {
        setLoaded(true);
      } else {
        setHasError(true);
      }
    }
  }, [src]);

  const isTilakOrLalitha =
    src &&
    (src.toLowerCase().includes("tilak") ||
      src.toLowerCase().includes("lalitha"));

  const isWideDistanceShot =
    src && src.includes("members26-27") && !isTilakOrLalitha;

  const showPlaceholder = !src || hasError;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {showPlaceholder && (
        <div className="tmc-photo-placeholder" aria-hidden="true">
          <span className="tmc-photo-placeholder-letter">
            {alt?.charAt(0) ?? "?"}
          </span>
        </div>
      )}
      {src && !hasError && (
        <img
          ref={imgRef}
          className={`tmc-photo-img ${loaded ? "loaded" : "preloading"}${
            isWideDistanceShot && !imageStyle ? " is-zoomed-portrait" : ""
          }`}
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setHasError(true)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: isWideDistanceShot ? "center top" : "center top",
            ...imageStyle,
          }}
        />
      )}
    </div>
  );
}

/* ─── Member Card ─── */
function MemberCard({ member, color }) {
  const hasLinkedin =
    member.linkedin &&
    member.linkedin !== "Nil" &&
    member.linkedin.trim() !== "";

  const hasGmail = member.gmail && member.gmail.trim() !== "";

  const linkedinUrl = hasLinkedin
    ? member.linkedin.startsWith("http")
      ? member.linkedin
      : `https://${member.linkedin}`
    : null;

  return (
    <div className="tmc-wrap" style={{ "--card-accent": color }}>
      {/* Neo-brutalist offset shadow block */}
      <div className="tmc-shadow" aria-hidden="true" />

      <div
        className="tmc"
        role="article"
        aria-label={`${member.name} – ${member.post}`}
      >
        {/* ── Body: photo + info ── */}
        <div className="tmc-body">
          {/* Photo frame */}
          <div className="tmc-photo-frame">
            <LazyPhoto src={member.src} alt={member.name} imageStyle={member.imageStyle} />
          </div>

          {/* Info */}
          <div className="tmc-info">
            <p className="tmc-name">{member.name}</p>
            <div className="tmc-role-badge">
              <span className="tmc-role-text">{member.post}</span>
            </div>
          </div>
        </div>

        {/* ── Footer buttons — always visible ── */}
        <div className="tmc-footer">
          {hasLinkedin ? (
            <a
              className="tmc-btn"
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on LinkedIn`}
              onClick={(e) => e.stopPropagation()}
            >
              <span className="tmc-btn-icon">
                <LinkedInIcon />
              </span>
              LINKEDIN
            </a>
          ) : (
            <span className="tmc-btn disabled" aria-hidden="true">
              <span className="tmc-btn-icon">
                <LinkedInIcon />
              </span>
              LINKEDIN
            </span>
          )}

          {hasGmail ? (
            <a
              className="tmc-btn"
              href={`mailto:${member.gmail}`}
              aria-label={`Email ${member.name}`}
              onClick={(e) => e.stopPropagation()}
            >
              <span className="tmc-btn-icon">
                <MailIcon />
              </span>
              EMAIL
            </a>
          ) : (
            <span className="tmc-btn disabled" aria-hidden="true">
              <span className="tmc-btn-icon">
                <MailIcon />
              </span>
              EMAIL
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Section with scroll-reveal ─── */
function TeamSection({ categoryKey, members, color }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (el.getBoundingClientRect().top < window.innerHeight) {
      el.classList.add("visible");
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("visible");
          obs.disconnect();
        }
      },
      { threshold: 0.04, rootMargin: "0px 0px -40px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="team-section"
      style={{ "--section-color": color }}
    >
      <div className="team-section-header">
        <div className="team-section-accent" />
        <h2 className="team-section-label">
          {CAT_DISPLAY[categoryKey] || categoryKey}
        </h2>
        <div className="team-section-line" />
        <span className="team-section-count">{members.length}</span>
      </div>
      <div className="team-grid">
        {members.map((m, i) => (
          <MemberCard key={`${m.name}-${i}`} member={m} color={color} />
        ))}
      </div>
    </section>
  );
}

/* ─── Team Page ─── */
export default function TeamPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isExecomExpanded, setIsExecomExpanded] = useState(false);

  // Group current updated team (Executive Committee + SPS, etc.)
  const currentGrouped = {};
  CURRENT_TEAM.forEach((m) => {
    if (!currentGrouped[m.type]) currentGrouped[m.type] = [];
    currentGrouped[m.type].push(m);
  });

  const sortedRenderKeys = (keys) => {
    return DIVISION_ORDER.filter((k) => keys.includes(k));
  };

  const currentActiveCats = CATEGORIES.filter(
    (c) => c.key === "all" || currentGrouped[c.key],
  );
  const currentRenderKeys =
    activeCategory === "all"
      ? sortedRenderKeys(Object.keys(currentGrouped))
      : [activeCategory].filter((k) => currentGrouped[k]);

  // Group archived previous roster
  const grouped = {};
  current_team_photo.forEach((m) => {
    if (!grouped[m.type]) grouped[m.type] = [];
    grouped[m.type].push(m);
  });
  const archivedRenderKeys = sortedRenderKeys(Object.keys(grouped));

  return (
    <div className="team-page palette-blueprint">
      <header className="team-hero">
        <div className="team-hero-badge">⚡ IEEE-SJCE · 2025–26</div>
        <h1>
          Our <em>Team</em>
        </h1>
        <p>
          The dedicated minds driving innovation at IEEE-SJCE — students leading
          change, one project at a time.
        </p>

        <span className="team-hero-count">
          ✦ {CURRENT_TEAM.length} members · {Object.keys(currentGrouped).length}{" "}
          divisions
        </span>
      </header>

      {/* ─── Filter Tabs for Active Divisions ─── */}
      <nav className="team-tabs-wrap" aria-label="Filter by division">
        <div className="team-tabs">
          {currentActiveCats.map((cat) => (
            <button
              key={cat.key}
              data-cat={cat.key}
              className={`team-tab-btn${activeCategory === cat.key ? " active" : ""}`}
              style={
                activeCategory === cat.key ? { "--tab-color": cat.color } : {}
              }
              onClick={() => setActiveCategory(cat.key)}
              aria-pressed={activeCategory === cat.key}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </nav>

      {/* ─── Current Team Sections (Executive Committee, SPS, etc.) ─── */}
      <main className="team-content" style={{ paddingBottom: "32px" }}>
        {currentRenderKeys.map((key) => (
          <TeamSection
            key={key}
            categoryKey={key}
            members={currentGrouped[key]}
            color={CAT_MAP[key]?.color ?? "#2563EB"}
          />
        ))}
      </main>

      {/* ─── Collapsible Previous Execoms Roster ─── */}
      <section className="execom-accordion-section">
        <div className="execom-accordion-wrapper">
          <button
            type="button"
            className={`execom-accordion-bar ${isExecomExpanded ? "is-open" : ""}`}
            onClick={() => setIsExecomExpanded((prev) => !prev)}
            aria-expanded={isExecomExpanded}
          >
            <span className="execom-accordion-title">IEEE Execom 2025-26</span>
            <span className="execom-toggle-icon">
              {isExecomExpanded ? "−" : "+"}
            </span>
          </button>

          {isExecomExpanded && (
            <div className="execom-accordion-content">
              <div className="team-content" style={{ paddingTop: "40px" }}>
                {archivedRenderKeys.map((key) => (
                  <TeamSection
                    key={key}
                    categoryKey={key}
                    members={grouped[key]}
                    color={CAT_MAP[key]?.color ?? "#2563EB"}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
