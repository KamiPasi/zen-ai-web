import React, { useState } from 'react';
import { 
  Activity, 
  ExternalLink, 
  Mail, 
  Send,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Globe // Fixed: Added missing Globe import
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Particles from './components/Particles';

/**
 * ZEN-AI VIP Official Website - Fixed Version
 * Theme: White, Minimalist, Enterprise, High-End
 * Features: Brand Logos for each pricing group
 */

// --- Brand Logos ---

const AzureLogo = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path fill="currentColor" opacity="0.8" d="M33.338 6.544h26.038l-27.03 80.087a4.152 4.152 0 0 1-3.933 2.824H8.149a4.145 4.145 0 0 1-3.928-5.47L29.404 9.368a4.152 4.152 0 0 1 3.934-2.825z"/>
    <path fill="currentColor" d="M71.175 60.261h-41.29a1.911 1.911 0 0 0-1.305 3.309l26.532 24.764a4.171 4.171 0 0 0 2.846 1.121h23.38z"/>
    <path fill="currentColor" opacity="0.9" d="M66.595 9.364a4.145 4.145 0 0 0-3.928-2.82H33.648a4.146 4.146 0 0 1 3.928 2.82l25.184 74.62a4.146 4.146 0 0 1-3.928 5.472h29.02a4.146 4.146 0 0 0 3.927-5.472z"/>
  </svg>
);

const OpenAILogo = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg viewBox="0 0 20 20" fill={color} xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M11.2475 18.25C10.6975 18.25 10.175 18.1455 9.67999 17.9365C9.18499 17.7275 8.74499 17.436 8.35999 17.062C7.94199 17.205 7.50749 17.2765 7.05649 17.2765C6.31949 17.2765 5.63749 17.095 5.01049 16.732C4.38349 16.369 3.87749 15.874 3.49249 15.247C3.11849 14.62 2.93149 13.9215 2.93149 13.1515C2.93149 12.8325 2.97549 12.486 3.06349 12.112C2.62349 11.705 2.28249 11.2375 2.04049 10.7095C1.79849 10.1705 1.67749 9.6095 1.67749 9.0265C1.67749 8.4325 1.80399 7.8605 2.05699 7.3105C2.30999 6.7605 2.66199 6.2875 3.11299 5.8915C3.57499 5.4845 4.10849 5.204 4.71349 5.05C4.83449 4.423 5.08749 3.862 5.47249 3.367C5.86849 2.861 6.35249 2.465 6.92449 2.179C7.49649 1.893 8.10699 1.75 8.75599 1.75C9.30599 1.75 9.82849 1.8545 10.3235 2.0635C10.8185 2.2725 11.2585 2.564 11.6435 2.938C12.0615 2.795 12.496 2.7235 12.947 2.7235C13.684 2.7235 14.366 2.905 14.993 3.268C15.62 3.631 16.1205 4.126 16.4945 4.753C16.8795 5.38 17.072 6.0785 17.072 6.8485C17.072 7.1675 17.028 7.514 16.94 7.888C17.38 8.295 17.721 8.768 17.963 9.307C18.205 9.835 18.326 10.3905 18.326 10.9735C18.326 11.5675 18.1995 12.1395 17.9465 12.6895C17.6935 13.2395 17.336 13.718 16.874 14.125C16.423 14.521 15.895 14.796 15.29 14.95C15.169 15.577 14.9105 16.138 14.5145 16.633C14.1295 17.139 13.651 17.535 13.079 17.821C12.507 18.107 11.8965 18.25 11.2475 18.25ZM7.17199 16.1875C7.72199 16.1875 8.20049 16.072 8.60749 15.841L11.7095 14.059C11.8195 13.982 11.8745 13.8775 11.8745 13.7455V12.3265L7.88149 14.62C7.63949 14.763 7.39749 14.763 7.15549 14.62L4.03699 12.8215C4.03699 12.8545 4.03149 12.893 4.02049 12.937C4.02049 12.981 4.02049 13.047 4.02049 13.135C4.02049 13.696 4.15249 14.213 4.41649 14.686C4.69149 15.148 5.07099 15.511 5.55499 15.775C6.03899 16.05 6.57799 16.1875 7.17199 16.1875ZM7.33699 13.498C7.40299 13.531 7.46349 13.5475 7.51849 13.5475C7.57349 13.5475 7.62849 13.531 7.68349 13.498L8.92099 12.7885L4.94449 10.4785C4.70249 10.3355 4.58149 10.121 4.58149 9.835V6.2545C4.03149 6.4965 3.59149 6.8705 3.26149 7.3765C2.93149 7.8715 2.76649 8.4215 2.76649 9.0265C2.76649 9.5655 2.90399 10.0825 3.17899 10.5775C3.45399 11.0725 3.81149 11.4465 4.25149 11.6995L7.33699 13.498ZM11.2475 17.161C11.8305 17.161 12.3585 17.029 12.8315 16.765C13.3045 16.501 13.6785 16.138 13.9535 15.676C14.2285 15.214 14.366 14.697 14.366 14.125V10.561C14.366 10.429 14.311 10.33 14.201 10.264L12.947 9.538V14.1415C12.947 14.4275 12.826 14.642 12.584 14.785L9.46549 16.5835C10.0045 16.9685 10.5985 17.161 11.2475 17.161ZM11.8745 11.122V8.878L10.01 7.822L8.12899 8.878V11.122L10.01 12.178L11.8745 11.122ZM7.05649 5.8585C7.05649 5.5725 7.17749 5.358 7.41949 5.215L10.538 3.4165C9.99899 3.0315 9.40499 2.839 8.75599 2.839C8.17299 2.839 7.64499 2.971 7.17199 3.235C6.69899 3.499 6.32499 3.862 6.04999 4.324C5.78599 4.786 5.65399 5.303 5.65399 5.875V9.4225C5.65399 9.5545 5.70899 9.659 5.81899 9.736L7.05649 10.462V5.8585ZM15.4385 13.7455C15.9885 13.5035 16.423 13.1295 16.742 12.6235C17.072 12.1175 17.237 11.5675 17.237 10.9735C17.237 10.4345 17.0995 9.9175 16.8245 9.4225C16.5495 8.9275 16.192 8.5535 15.752 8.3005L12.6665 6.5185C12.6005 6.4745 12.54 6.458 12.485 6.469C12.43 6.469 12.375 6.4855 12.32 6.5185L11.0825 7.2115L15.0755 9.538C15.1965 9.604 15.2845 9.692 15.3395 9.802C15.4055 9.901 15.4385 10.022 15.4385 10.165V13.7455ZM12.122 5.3635C12.364 5.2095 12.606 5.2095 12.848 5.3635L15.983 7.195C15.983 7.118 15.983 7.019 15.983 6.898C15.983 6.37 15.851 5.8695 15.587 5.3965C15.334 4.9125 14.9655 4.5275 14.4815 4.2415C14.0085 3.9555 13.4585 3.8125 12.8315 3.8125C12.2815 3.8125 11.803 3.928 11.396 4.159L8.29399 5.941C8.18399 6.018 8.12899 6.1225 8.12899 6.2545V7.6735L12.122 5.3635Z"/>
  </svg>
);

const AWSLogo = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M96.0000 40.0000 L99.5002 42.0000 L99.5002 43.5000 L98.5000 47.0000 L56.0000 57.0000 L52.0040 47.0708 L96.0000 40.0000 M96.0000 40.0000 " fill="currentColor" style={{transformOrigin: '50px 50px', transform: 'rotate(330deg) scaleY(0.985) rotate(-330deg)'}}></path>
    <path d="M80.1032 10.5903 L84.9968 11.6171 L86.2958 13.2179 L87.5346 17.0540 L87.0213 19.5007 L58.5000 58.5000 L49.0000 49.0000 L75.3008 14.4873 L80.1032 10.5903 M80.1032 10.5903 " fill="currentColor" style={{transformOrigin: '50px 50px', transform: 'rotate(300deg) scaleY(0.959981) rotate(-300deg)'}}></path>
    <path d="M55.5002 4.5000 L58.5005 2.5000 L61.0002 3.5000 L63.5002 7.0000 L56.6511 48.1620 L52.0005 45.0000 L50.0005 39.5000 L53.5003 8.5000 L55.5002 4.5000 M55.5002 4.5000 " fill="currentColor" style={{transformOrigin: '50px 50px', transform: 'rotate(270deg) scaleY(1.04165) rotate(-270deg)'}}></path>
    <path d="M23.4253 5.1588 L26.5075 1.2217 L28.5175 0.7632 L32.5063 1.3458 L34.4748 2.8868 L48.8202 34.6902 L54.0089 49.8008 L47.9378 53.1760 L24.8009 11.1886 L23.4253 5.1588 M23.4253 5.1588 " fill="currentColor" style={{transformOrigin: '50px 50px', transform: 'rotate(240deg) scaleY(1.18331) rotate(-240deg)'}}></path>
    <path d="M8.4990 27.0019 L7.4999 23.0001 L10.5003 19.5001 L14.0003 20.0001 L15.0003 20.0001 L36.0000 35.5000 L42.5000 40.5000 L51.5000 47.5000 L46.5000 56.0000 L42.0002 52.5000 L39.0001 49.5000 L10.0000 29.0001 L8.4990 27.0019 M8.4990 27.0019 " fill="currentColor" style={{transformOrigin: '50px 50px', transform: 'rotate(210deg) scaleY(1.25502) rotate(-210deg)'}}></path>
    <path d="M2.5003 53.0000 L0.2370 50.5000 L0.2373 48.2759 L2.5003 47.5000 L28.0000 49.0000 L53.0000 51.0000 L52.1885 55.9782 L4.5000 53.5000 L2.5003 53.0000 M2.5003 53.0000 " fill="currentColor" style={{transformOrigin: '50px 50px', transform: 'rotate(180deg) scaleY(1.15835) rotate(-180deg)'}}></path>
    <path d="M17.5002 79.0264 L12.5005 79.0264 L10.5124 76.7369 L10.5124 74.0000 L19.0005 68.0000 L53.5082 46.0337 L57.0005 52.0000 L17.5002 79.0264 M17.5002 79.0264 " fill="currentColor" style={{transformOrigin: '50px 50px', transform: 'rotate(150deg) scaleY(1.15169) rotate(-150deg)'}}></path>
    <path d="M27.0004 92.9999 L25.0003 93.4999 L22.0003 91.9999 L22.5004 89.4999 L52.0003 50.5000 L56.0004 55.9999 L34.0003 85.0000 L27.0004 92.9999 M27.0004 92.9999 " fill="currentColor" style={{transformOrigin: '50px 50px', transform: 'rotate(120deg) scaleY(0.94) rotate(-120deg)'}}></path>
    <path d="M51.9998 98.0000 L50.5002 100.0000 L47.5002 101.0000 L45.0001 99.0000 L43.5000 96.0000 L51.0003 55.4999 L55.5001 55.9999 L51.9998 98.0000 M51.9998 98.0000 " fill="currentColor" style={{transformOrigin: '50px 50px', transform: 'rotate(90deg) scaleY(0.925) rotate(-90deg)'}}></path>
    <path d="M77.5007 86.9997 L77.5007 90.9997 L77.0006 92.4997 L75.0004 93.4997 L71.5006 93.0339 L47.4669 57.2642 L56.9998 50.0002 L64.9994 64.5004 L65.7507 69.7497 L77.5007 86.9997 M77.5007 86.9997 " fill="currentColor" style={{transformOrigin: '50px 50px', transform: 'rotate(60deg) scaleY(1.075) rotate(-60deg)'}}></path>
    <path d="M89.0008 80.9991 L89.5008 83.4991 L88.0008 85.4991 L86.5007 84.9991 L78.0007 78.9991 L65.0007 67.4991 L55.0007 60.4991 L58.0000 51.0000 L62.9999 54.0001 L66.0007 59.4991 L89.0008 80.9991 M89.0008 80.9991 " fill="currentColor" style={{transformOrigin: '50px 50px', transform: 'rotate(30deg) scaleY(0.997) rotate(-30deg)'}}></path>
    <path d="M82.5003 55.5000 L95.0003 56.5000 L98.0003 58.5000 L100.0000 61.5000 L100.0000 63.6587 L94.5003 66.0000 L66.5005 59.0000 L55.0003 58.5000 L58.0000 48.0000 L66.0005 54.0000 L82.5003 55.5000 M82.5003 55.5000 " fill="currentColor" style={{transformOrigin: '50px 50px', transform: 'rotate(0deg) scaleY(1.015) rotate(0deg)'}}></path>
  </svg>
);

const GeminiLogo = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="url(#gemini-gradient)" />
    <defs>
      <linearGradient id="gemini-gradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4EACEF"/>
        <stop offset="1" stopColor="#DD568D"/>
      </linearGradient>
    </defs>
  </svg>
);

const GrokLogo = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
     <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

// --- Main App Component ---

// SVG Component for the Logo based on the uploaded image (Zen Logo)
const ZenLogo = ({ className = "w-12 h-12" }) => (
  <svg 
    viewBox="0 0 589 589" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
  >
  <g transform="translate(0,589) scale(0.1,-0.1)" fill="#1351a6">
<path d="M2597 5884 c-3 -3 -18 -6 -34 -8 -15 -1 -34 -5 -41 -9 -6 -5 -16 -6
-22 -2 -5 3 -18 0 -29 -7 -17 -10 -23 -9 -39 6 -13 11 -22 14 -27 7 -3 -6 1
-11 10 -11 9 0 13 -5 9 -11 -3 -6 -15 -9 -25 -6 -10 3 -21 1 -24 -4 -3 -4 -12
-6 -19 -3 -8 3 -17 0 -21 -5 -3 -6 -11 -9 -16 -5 -5 3 -15 1 -22 -4 -7 -6 -16
-11 -22 -12 -5 -1 -21 -6 -34 -11 -13 -5 -26 -7 -29 -4 -3 2 -10 0 -17 -5 -6
-5 -20 -11 -31 -13 -10 -1 -25 -7 -33 -11 -11 -7 -13 -5 -8 7 3 8 0 18 -7 20
-10 4 -12 -1 -9 -14 4 -13 -2 -21 -18 -28 -28 -10 -42 -5 -33 12 4 7 3 8 -2 4
-5 -5 -9 -14 -9 -20 -1 -7 -6 -11 -13 -9 -7 1 -12 -3 -12 -9 0 -6 -7 -9 -15
-5 -8 3 -15 1 -15 -5 0 -6 -4 -7 -10 -4 -5 3 -10 1 -10 -6 0 -7 -3 -9 -7 -6
-3 4 -12 2 -20 -4 -7 -6 -13 -8 -13 -3 0 5 -4 3 -9 -4 -4 -7 -18 -14 -29 -15
-12 -1 -22 -5 -22 -10 0 -4 -4 -5 -10 -2 -5 3 -10 1 -10 -5 0 -6 -4 -8 -10 -5
-5 3 -10 2 -10 -3 0 -5 -6 -9 -14 -9 -23 0 -76 -25 -76 -35 0 -6 -7 -5 -15 2
-13 11 -14 10 -9 -4 4 -11 1 -16 -10 -16 -9 0 -16 -5 -16 -11 0 -5 -4 -7 -10
-4 -5 3 -10 1 -10 -5 0 -6 -4 -9 -9 -5 -5 3 -16 -2 -24 -10 -12 -11 -17 -12
-20 -2 -3 7 -6 5 -6 -5 -1 -11 -8 -16 -20 -13 -15 3 -18 -1 -14 -12 4 -10 2
-14 -4 -10 -6 4 -14 1 -16 -5 -4 -9 -6 -9 -6 1 -1 11 -5 10 -16 -5 -13 -16
-16 -17 -25 -4 -9 12 -10 10 -5 -9 5 -15 3 -21 -3 -17 -6 4 -15 -2 -21 -11 -8
-14 -11 -15 -11 -3 0 9 -6 5 -15 -10 -8 -14 -15 -20 -15 -15 0 6 -7 1 -15 -9
-8 -11 -15 -16 -15 -10 0 5 -5 2 -10 -6 -5 -8 -14 -15 -19 -15 -6 0 -17 -9
-26 -20 -9 -11 -14 -13 -10 -5 4 8 -6 2 -20 -15 -15 -16 -24 -24 -19 -16 4 8
-9 2 -30 -14 -20 -15 -41 -36 -47 -46 -5 -11 -16 -16 -24 -13 -8 4 -15 2 -15
-2 0 -5 -10 -20 -23 -34 -12 -14 -18 -20 -13 -13 13 20 4 23 -18 7 -11 -8 -16
-14 -12 -14 5 0 3 -6 -4 -14 -6 -8 -19 -12 -28 -9 -13 4 -14 3 -4 -5 11 -7 8
-15 -13 -38 -15 -16 -22 -21 -16 -12 10 14 9 16 -8 11 -12 -3 -18 -9 -15 -14
3 -5 -2 -9 -11 -9 -9 0 -14 -4 -11 -8 6 -9 -38 -52 -53 -52 -5 0 -8 -10 -7
-22 0 -13 -4 -22 -11 -21 -6 1 -23 -13 -37 -32 -14 -18 -35 -36 -45 -40 -12
-3 -18 -12 -15 -20 4 -8 -11 -26 -38 -46 -24 -17 -34 -29 -23 -25 18 7 18 5
-3 -17 -12 -13 -20 -27 -17 -30 3 -4 2 -5 -1 -2 -11 7 -44 -36 -37 -48 4 -7
-1 -8 -13 -3 -10 4 -15 4 -12 0 7 -7 -88 -144 -109 -157 -8 -5 -11 -12 -8 -18
4 -5 1 -9 -4 -9 -6 0 -11 -7 -11 -15 0 -7 -6 -18 -14 -22 -8 -4 -14 -12 -14
-16 1 -20 -38 -77 -53 -77 -10 0 -25 -3 -34 -6 -13 -5 -14 -9 -4 -15 10 -6 10
-11 0 -22 -9 -12 -9 -16 1 -20 11 -4 10 -6 0 -6 -7 -1 -11 -5 -7 -10 7 -12
-15 -61 -27 -61 -5 0 -6 -4 -3 -10 3 -5 1 -10 -6 -10 -6 0 -9 -8 -6 -20 3 -11
1 -18 -4 -14 -5 3 -9 0 -9 -5 0 -6 -8 -11 -17 -12 -11 0 -13 -3 -6 -6 10 -3 9
-13 -3 -41 -8 -20 -19 -39 -25 -43 -6 -3 -11 -10 -12 -15 -1 -5 -5 -8 -9 -7
-4 2 -6 -11 -6 -28 1 -17 -4 -34 -10 -38 -7 -4 -13 -23 -14 -43 -2 -20 -6 -34
-10 -32 -3 2 -9 -9 -13 -26 -4 -16 -10 -30 -15 -30 -4 0 -8 -6 -7 -12 1 -34
-5 -46 -26 -52 -18 -6 -19 -8 -6 -14 16 -6 15 -12 -2 -67 -11 -33 -20 -76 -22
-96 -1 -21 -5 -35 -9 -32 -5 2 -8 -7 -8 -21 0 -14 -4 -27 -10 -31 -5 -3 -7
-12 -4 -20 3 -8 -2 -22 -11 -31 -12 -12 -13 -19 -5 -24 9 -6 9 -13 0 -29 -9
-18 -9 -26 2 -39 11 -13 11 -14 -1 -8 -10 7 -12 -2 -10 -42 2 -28 0 -48 -5
-45 -5 4 -7 -19 -4 -53 4 -35 3 -51 -2 -39 -7 17 -9 16 -10 -10 -5 -102 -4
-175 3 -175 4 0 3 -9 -3 -19 -12 -23 -14 -74 -2 -68 4 3 5 -38 4 -90 -2 -52 0
-93 5 -90 4 3 8 -20 8 -51 1 -76 10 -166 19 -180 4 -7 3 -12 -2 -12 -5 0 -9
-7 -9 -15 0 -8 4 -15 9 -15 7 0 25 -80 19 -89 -2 -2 2 -7 8 -10 5 -4 12 -18
15 -31 10 -46 29 -115 36 -135 25 -65 32 -85 32 -92 0 -4 3 -12 8 -18 15 -18
49 -118 44 -127 -3 -5 4 -17 16 -28 20 -18 12 -39 -10 -25 -5 3 -10 3 -10 0 0
-3 13 -10 28 -16 29 -10 68 -72 57 -90 -4 -5 -1 -9 4 -9 6 0 11 -7 11 -15 0
-8 4 -15 10 -15 5 0 17 -15 27 -33 17 -32 19 -37 21 -69 1 -11 7 -15 17 -12 8
4 15 1 15 -6 0 -6 5 -8 12 -4 6 4 8 3 5 -3 -4 -6 7 -29 24 -53 18 -25 28 -48
24 -58 -3 -9 -3 -13 1 -10 9 10 46 -11 39 -21 -3 -5 2 -11 10 -15 8 -3 15 -12
15 -21 0 -8 5 -16 10 -16 6 -1 15 -3 20 -4 6 -1 13 -3 16 -4 4 0 1 -8 -6 -16
-10 -12 -10 -15 3 -15 8 0 30 -18 47 -40 17 -22 38 -40 45 -40 17 0 57 -49 49
-61 -4 -8 16 -13 38 -10 4 0 19 -14 34 -32 15 -17 32 -31 37 -29 5 2 7 -5 3
-14 -4 -11 -2 -15 8 -11 8 3 17 -1 20 -9 3 -8 10 -13 15 -12 5 2 17 -6 26 -17
9 -11 14 -13 10 -5 -4 8 3 4 14 -10 11 -14 21 -20 21 -15 0 6 5 2 11 -8 6 -9
14 -15 20 -12 5 4 12 -1 15 -9 3 -9 10 -13 15 -10 5 3 9 0 9 -5 0 -6 5 -10 11
-8 6 1 14 -5 16 -13 4 -12 3 -12 -5 -1 -6 8 -12 9 -16 3 -3 -5 2 -13 11 -17
10 -3 19 -1 21 5 3 7 10 4 19 -7 9 -11 12 -12 8 -3 -4 10 -2 9 8 -2 8 -10 17
-15 20 -11 4 3 7 1 7 -6 0 -7 5 -9 10 -6 6 3 10 1 10 -5 0 -6 5 -8 12 -4 8 5
9 2 4 -11 -6 -16 -4 -16 11 -4 15 12 16 12 11 -2 -4 -9 -1 -16 8 -16 7 0 11 4
8 9 -3 4 2 5 10 2 9 -3 16 -10 16 -16 0 -5 4 -6 10 -3 5 3 10 1 10 -5 0 -6 5
-8 10 -5 6 3 10 1 10 -5 0 -6 5 -8 10 -5 6 3 10 2 10 -4 0 -6 7 -8 15 -5 8 4
15 1 15 -6 0 -6 5 -8 11 -4 8 4 9 -4 5 -27 -6 -33 -5 -33 5 -6 10 26 29 37 29
17 0 -5 6 -7 14 -4 7 3 20 -2 29 -10 8 -8 17 -13 19 -10 3 2 18 -1 34 -7 16
-7 35 -11 42 -10 6 1 12 -3 12 -9 0 -6 4 -8 10 -5 5 3 16 3 22 -1 7 -5 19 -9
28 -10 8 0 62 -10 120 -22 455 -90 940 -51 1342 109 731 291 1216 880 1303
1583 75 602 -175 1072 -637 1198 -71 20 -106 23 -248 22 -140 0 -174 -3 -228
-21 -59 -20 -172 -81 -172 -93 0 -3 46 -6 103 -6 57 -1 130 -9 167 -18 241
-61 428 -258 501 -531 44 -163 24 -429 -47 -627 -124 -345 -402 -622 -770
-768 -428 -170 -1000 -79 -1368 217 -282 228 -468 546 -531 911 -89 511 22
1043 309 1470 96 145 178 242 307 368 310 300 658 495 1065 598 340 86 734 85
1112 -4 50 -12 92 -26 92 -31 0 -4 7 -6 15 -3 8 3 20 2 27 -2 7 -4 24 -9 37
-10 14 -2 27 -8 29 -13 2 -5 10 -7 19 -4 10 4 14 2 10 -4 -5 -7 0 -9 13 -6 11
3 20 0 20 -6 0 -5 7 -8 15 -5 8 4 15 1 15 -5 0 -6 7 -8 15 -5 8 4 15 1 15 -6
0 -6 5 -8 10 -5 6 3 10 2 10 -4 0 -6 6 -8 14 -5 8 3 17 0 21 -5 3 -6 11 -9 16
-6 5 4 9 2 9 -4 0 -6 7 -8 15 -5 8 4 15 1 15 -6 0 -6 5 -8 10 -5 6 3 10 2 10
-4 0 -6 7 -8 15 -5 8 4 15 1 15 -6 0 -6 5 -8 10 -5 6 3 10 2 10 -4 0 -6 6 -8
14 -5 7 3 16 -2 19 -10 4 -9 13 -13 22 -10 8 3 15 1 15 -6 0 -6 5 -8 10 -5 6
3 10 1 10 -5 0 -6 5 -8 10 -5 6 3 10 1 10 -5 0 -6 5 -8 10 -5 6 3 10 1 10 -5
0 -6 5 -8 10 -5 6 3 10 1 10 -5 0 -6 5 -8 10 -5 6 3 10 1 10 -5 0 -6 4 -9 9
-6 5 3 12 -1 15 -10 3 -8 10 -12 16 -9 5 3 10 1 10 -5 0 -6 5 -8 10 -5 6 3 10
1 10 -5 0 -6 4 -9 9 -6 5 3 12 -1 15 -10 3 -8 10 -12 16 -9 5 3 10 1 10 -4 0
-6 4 -10 9 -9 5 2 17 -6 26 -17 9 -11 14 -13 10 -5 -4 8 3 4 14 -10 11 -14 21
-21 21 -17 0 4 16 -8 36 -28 19 -19 40 -32 46 -29 6 4 8 3 4 -4 -3 -6 4 -14
16 -18 22 -7 22 -7 3 -15 -18 -7 -18 -8 -2 -8 11 -1 15 -5 11 -13 -5 -8 -2 -9
10 -5 10 4 22 7 27 7 10 0 -48 94 -93 152 -17 21 -26 43 -22 49 4 7 3 9 -4 5
-13 -8 -44 33 -35 47 3 6 2 7 -4 4 -6 -4 -40 28 -76 71 -36 42 -77 88 -91 101
-14 13 -23 28 -19 34 3 6 1 7 -5 3 -6 -3 -37 17 -69 45 -32 28 -68 58 -80 66
-13 8 -20 20 -16 26 3 5 1 7 -4 4 -6 -4 -22 2 -36 13 -14 11 -28 20 -31 20 -3
0 -15 8 -26 17 -15 13 -16 19 -7 25 8 6 5 8 -8 6 -11 -1 -54 18 -95 44 -41 25
-101 59 -132 74 -38 18 -53 31 -45 36 7 5 3 7 -13 7 -14 -1 -59 15 -100 35
-41 21 -65 35 -52 33 13 -3 20 -1 16 5 -3 5 -15 7 -27 4 -11 -3 -35 1 -54 9
-18 8 -33 11 -33 8 0 -3 -7 1 -17 8 -9 8 -18 13 -20 12 -1 -2 -6 -3 -10 -3 -5
0 -2 4 4 8 8 5 0 8 -20 9 -17 1 -41 4 -52 6 -11 3 -22 6 -25 6 -3 1 2 6 10 11
13 8 12 10 -2 10 -10 0 -18 -5 -18 -11 0 -8 -4 -9 -13 0 -8 6 -17 8 -20 4 -4
-3 -13 0 -22 7 -8 7 -15 9 -15 5 0 -4 -6 -2 -13 4 -8 6 -17 8 -20 5 -3 -3 -12
-2 -19 2 -13 9 -26 12 -63 18 -11 2 -20 4 -20 6 0 1 -11 4 -25 6 -14 2 -34 6
-45 8 -11 2 -24 4 -30 5 -5 1 -3 6 5 11 8 5 10 10 4 10 -5 0 -14 -4 -20 -9 -5
-6 -26 -5 -54 1 -46 11 -713 22 -723 12z"/>
<path d="M3515 4960 c-420 -32 -800 -208 -1107 -513 -317 -315 -496 -710 -515
-1141 -12 -271 37 -488 158 -703 58 -102 215 -262 322 -328 324 -199 737 -158
992 99 60 59 143 172 134 181 -3 2 -29 -3 -59 -11 -30 -9 -111 -18 -180 -21
-148 -6 -241 12 -368 73 -97 47 -231 176 -287 277 -135 245 -133 562 5 842
181 367 546 585 978 585 655 0 1180 -445 1327 -1125 101 -463 3 -1029 -253
-1475 -361 -629 -1027 -1090 -1752 -1214 -421 -72 -895 -29 -1350 123 -129 43
-338 130 -365 151 -5 4 -32 20 -60 36 -27 15 -63 36 -80 46 -16 10 -38 21 -48
24 -10 4 -16 12 -13 19 3 8 -2 11 -13 8 -9 -2 -25 5 -35 16 -11 12 -25 21 -32
21 -7 0 -14 3 -16 8 -1 4 -45 40 -96 80 -127 100 -152 123 -145 135 3 6 2 7
-4 4 -5 -4 -23 8 -39 25 -16 17 -24 28 -18 25 6 -3 11 0 11 7 0 8 -7 12 -15 9
-8 -3 -17 0 -22 6 -4 7 -18 11 -31 9 l-24 -3 23 -23 c12 -12 22 -25 22 -28 0
-4 10 -16 23 -28 12 -12 23 -29 25 -36 2 -8 19 -37 39 -63 19 -27 29 -46 21
-42 -7 4 -2 -3 12 -14 17 -14 20 -21 10 -21 -8 -1 -3 -8 13 -16 16 -9 25 -20
21 -26 -5 -8 -1 -9 12 -4 10 4 15 4 12 0 -8 -8 70 -109 85 -109 9 0 16 -19 19
-52 1 -7 5 -10 10 -6 5 3 49 -32 96 -78 115 -111 162 -150 172 -144 8 5 58
-57 52 -63 -2 -2 -1 -6 2 -9 3 -4 6 2 6 12 0 24 9 14 15 -15 6 -31 15 -38 15
-12 0 21 0 21 26 -3 15 -14 30 -22 34 -20 4 3 11 -2 14 -11 3 -8 9 -13 14 -10
4 2 13 -4 20 -15 10 -15 10 -19 0 -19 -9 0 -8 -3 2 -10 9 -6 17 -5 22 3 6 9 8
8 8 -2 0 -8 7 -11 20 -8 11 3 20 1 20 -4 0 -5 5 -8 11 -6 6 1 14 -4 17 -12 3
-9 0 -11 -9 -6 -12 7 -12 5 -1 -6 11 -12 14 -12 22 1 8 12 10 11 10 -5 0 -17
2 -17 10 -5 7 11 10 11 10 2 0 -7 5 -10 10 -7 6 3 10 1 10 -5 0 -6 5 -8 12 -4
8 5 9 2 4 -11 -5 -15 -4 -16 9 -5 11 9 15 9 15 1 0 -7 5 -9 10 -6 6 3 10 1 10
-5 0 -6 5 -8 10 -5 6 3 10 1 10 -5 0 -6 5 -8 10 -5 5 3 10 2 10 -4 0 -5 -6
-12 -12 -14 -8 -4 -7 -6 4 -6 9 -1 19 5 21 12 4 9 6 9 6 -1 1 -7 6 -10 11 -7
6 3 10 1 10 -4 0 -6 6 -10 13 -8 6 1 11 -3 10 -9 -1 -6 9 -10 22 -8 14 1 25
-2 25 -7 0 -6 4 -8 9 -4 5 3 12 1 16 -5 4 -6 11 -8 16 -5 5 4 9 2 9 -4 0 -6 7
-8 15 -5 8 4 15 1 15 -6 0 -6 4 -8 10 -5 5 3 10 1 10 -5 0 -7 7 -10 15 -7 8 4
17 2 20 -3 3 -5 -1 -10 -9 -12 -12 -3 -12 -5 0 -16 12 -11 16 -9 23 10 6 13
10 18 10 12 1 -6 8 -11 16 -12 8 -1 22 -3 30 -4 8 -1 15 -5 15 -9 0 -5 6 -6
14 -3 8 3 17 1 20 -5 4 -6 13 -8 21 -4 8 3 15 0 15 -7 0 -6 4 -9 9 -6 5 4 22
1 38 -6 15 -6 32 -10 37 -9 4 1 14 -3 20 -9 7 -5 16 -7 19 -4 3 3 11 3 17 -1
9 -6 9 -9 0 -15 -8 -5 -7 -9 4 -13 9 -4 15 -1 13 5 -1 7 7 14 17 16 14 3 17 0
13 -12 -5 -13 -3 -15 12 -7 10 6 21 8 24 5 3 -3 18 -7 34 -10 15 -2 39 -6 53
-9 14 -2 47 -7 74 -11 27 -3 60 -10 72 -14 24 -10 781 -6 829 4 40 8 74 14
110 20 37 5 81 14 115 21 14 3 36 8 50 11 14 3 48 11 75 19 28 8 53 14 58 14
4 1 23 7 42 15 19 8 35 12 35 9 0 -3 7 0 15 7 8 7 15 9 15 5 0 -4 7 -2 15 5 8
7 15 9 15 4 0 -4 5 -3 12 4 7 7 18 12 24 12 7 0 25 5 41 11 15 6 29 10 30 10
2 0 24 9 50 20 84 37 95 40 87 28 -4 -7 -1 -10 7 -7 8 3 13 10 12 15 -1 5 38
29 88 53 49 24 89 47 89 50 0 3 16 12 35 19 19 7 35 17 35 22 0 5 5 9 12 9 6
0 33 14 59 31 27 17 53 28 59 24 6 -4 10 -3 9 2 -3 20 2 33 14 33 16 0 189
130 277 209 41 36 75 59 82 55 7 -4 8 -3 4 5 -9 14 132 163 146 155 5 -3 7 -2
6 3 -5 15 34 63 46 56 6 -3 8 -3 4 2 -4 4 -3 14 3 22 10 11 15 11 28 1 14 -12
14 -11 2 4 -11 15 -9 23 19 58 17 22 37 37 42 34 6 -4 8 -3 5 3 -3 5 5 26 18
46 18 26 31 35 46 32 17 -3 19 -2 9 10 -9 10 -3 26 26 69 20 31 41 53 47 49 5
-3 7 -1 3 5 -7 12 91 182 106 182 5 0 6 4 3 10 -3 5 6 32 21 59 25 44 29 48
42 33 11 -15 12 -14 3 5 -14 28 33 145 55 136 8 -3 14 0 14 6 0 6 -4 11 -9 11
-6 0 -6 12 0 30 6 16 15 27 20 24 5 -3 6 1 4 8 -3 8 6 45 21 84 45 118 114
365 114 406 0 10 7 21 15 24 8 4 15 10 15 16 0 5 -4 6 -10 3 -5 -3 -10 -2 -10
4 0 5 6 12 13 14 8 4 8 6 0 6 -6 1 -9 10 -6 21 3 11 9 17 14 14 5 -3 9 2 9 11
0 9 -5 13 -11 9 -7 -4 -9 0 -6 12 18 60 29 277 24 449 -7 194 -24 320 -67 485
-12 47 -23 92 -24 100 0 8 -3 17 -6 20 -4 3 -15 30 -27 60 -11 30 -30 79 -42
108 -12 29 -17 51 -11 47 5 -3 10 -1 10 4 0 6 -7 11 -16 11 -10 0 -14 5 -10
16 3 8 2 13 -3 10 -5 -3 -11 1 -15 9 -3 8 -1 15 4 15 6 0 10 5 10 11 0 5 -4 7
-10 4 -12 -8 -52 55 -45 73 2 6 0 12 -5 12 -15 0 -63 77 -55 89 3 6 0 11 -7
11 -7 1 -34 33 -60 73 -26 40 -77 107 -113 149 -63 76 -77 97 -53 82 7 -5 8
-3 4 5 -5 7 -11 10 -14 7 -9 -10 -62 46 -55 57 3 6 1 7 -5 3 -7 -4 -12 -1 -12
9 0 9 -4 14 -8 11 -5 -3 -24 11 -43 30 -19 19 -64 61 -101 91 -37 31 -64 61
-61 66 3 6 2 7 -4 4 -13 -8 -48 17 -48 34 0 7 -6 14 -14 17 -9 3 -11 0 -6 -8
4 -6 -9 -1 -28 11 -21 14 -33 29 -30 37 4 8 0 12 -8 11 -22 -4 -60 11 -54 22
4 5 0 9 -8 9 -8 0 -58 22 -113 50 -54 27 -105 50 -111 50 -7 0 -13 4 -13 8 0
5 -6 9 -12 9 -7 0 -55 17 -107 37 -112 44 -326 100 -436 115 -124 16 -269 20
-390 11z"/>
    </g>
  </svg>
);

const PricingCard = ({ title, price, desc, ratio, tags, icon: Icon, highlight = false, warning = false }) => (
  <motion.div 
    className={`relative group flex flex-col p-6 rounded-3xl transition-all duration-300 border ${highlight ? 'bg-slate-900 text-white border-slate-800 shadow-2xl' : 'bg-white border-slate-100 text-slate-800'}`}
    whileHover={{ 
      y: highlight ? -8 : -4, 
      scale: highlight ? 1.03 : 1.01,
      boxShadow: highlight ? "0 25px 50px -12px rgba(0, 0, 0, 0.4)" : "0 10px 20px -5px rgba(0, 0, 0, 0.1)",
      borderColor: highlight ? "rgba(29, 100, 208, 0.5)" : "rgba(29, 100, 208, 0.1)",
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.6, delay: Math.random() * 0.2 }}
  >
    {highlight && (
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
        推荐 / Recommended
      </div>
    )}
    
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-2xl ${highlight ? 'bg-slate-800' : 'bg-slate-50'}`}>
        {/* Render the Icon component passed in props */}
        <Icon className={`w-6 h-6 ${highlight ? 'text-blue-400' : 'text-blue-600'}`} />
      </div>
      <div className={`text-sm font-medium px-2 py-1 rounded-lg ${highlight ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-500'}`}>
        {ratio}
      </div>
    </div>

    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <div className="flex items-baseline gap-1 mb-4">
      <span className={`text-3xl font-extrabold ${highlight ? 'text-white' : 'text-slate-900'}`}>{price}</span>
      <span className={`text-sm ${highlight ? 'text-slate-400' : 'text-slate-500'}`}></span>
    </div>

    <div className="space-y-3 mb-6 flex-grow">
      {desc.map((item, i) => (
        <div key={i} className="flex items-start gap-2 text-sm">
          {warning && i === desc.length - 1 ? (
             <AlertCircle size={16} className="mt-0.5 text-amber-500 flex-shrink-0" />
          ) : (
             <CheckCircle2 size={16} className={`mt-0.5 flex-shrink-0 ${highlight ? 'text-blue-400' : 'text-blue-600'}`} />
          )}
          <span className={`${highlight ? 'text-slate-300' : 'text-slate-600'}`}>{item}</span>
        </div>
      ))}
    </div>

    <div className="mt-auto pt-4 border-t border-dashed border-opacity-20 border-gray-400">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, i) => (
          <span key={i} className={`text-xs px-2 py-1 rounded-md border ${
            highlight 
              ? 'border-slate-700 bg-slate-800 text-slate-300' 
              : 'border-slate-200 bg-slate-50 text-slate-500'
          }`}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

const LinkCard = ({ title, url, desc, primary = false }) => (
  <motion.a 
    href={url} 
    target="_blank" 
    rel="noopener noreferrer"
    className={`flex flex-col justify-between p-8 rounded-3xl transition-all duration-300 relative overflow-hidden group ${
      primary 
        ? 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg' 
        : 'bg-white border border-slate-100 text-slate-800'
    }`}
    whileHover={{ 
      y: -5, 
      boxShadow: primary ? "0 25px 50px -12px rgba(59, 130, 246, 0.4)" : "0 10px 20px -5px rgba(0, 0, 0, 0.1)",
      borderColor: primary ? "rgba(255,255,255,0.3)" : "rgba(29, 100, 208, 0.1)",
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.6, delay: Math.random() * 0.2 }}
  >
    {/* Animated background on hover */}
    <span className={`absolute inset-0 block ${primary ? 'bg-gradient-to-br from-blue-700 to-indigo-800' : 'bg-slate-50'} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl z-0`} />

    <div className="relative z-10">
      <div className="flex items-center justify-between mb-4">
        <Globe size={28} className={primary ? 'text-blue-200' : 'text-blue-600'} />
        <ExternalLink size={20} className={primary ? 'text-blue-200 opacity-70' : 'text-slate-400'} />
      </div>
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className={`text-sm leading-relaxed ${primary ? 'text-blue-100' : 'text-slate-500'}`}>
        {desc}
      </p>
    </div>
    <div className="relative z-10 mt-6 flex items-center gap-2 font-semibold text-sm">
      立即访问 
      <motion.span 
        className="inline-block"
        initial={{ x: 0 }}
        whileHover={{ x: 5 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <ChevronRight size={16} />
      </motion.span>
    </div>
  </motion.a>
);

const App = () => {
  const [iframeLoading, setIframeLoading] = useState(true);

  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]); // Parallax background effect

  // Updated packages with Brand Logos
  const packages = [
    {
      title: "Azure 特价分组",
      price: "0.3 元/刀",
      ratio: "3倍分组",
      icon: AzureLogo,
      desc: ["Azure官方转发", "特惠价格", "稳定性有限"],
      tags: ["限时特价", "测试首选"],
      warning: true
    },
    {
      title: "Azure 最火爆分组",
      price: "0.44 元/刀",
      ratio: "4.4倍分组",
      icon: AzureLogo,
      desc: ["Azure官方转发", "比较稳定", "性价比之选"],
      tags: ["热销", "高性价比"],
    },
    {
      title: "AZ 高可用分组",
      price: "1.0 元/刀",
      ratio: "10倍分组",
      icon: AzureLogo,
      desc: ["全模型支持", "高并发处理", "超级稳定，生产环境优选"],
      tags: ["生产环境", "SLA保证"],
      highlight: true
    },
    {
      title: "Azure EA 分组",
      price: "5.0 元/刀",
      ratio: "50倍分组",
      icon: AzureLogo,
      desc: ["Azure企业订阅官方转发", "企业通道", "极致保稳"],
      tags: ["企业级", "不掉线"],
    },
    {
      title: "OpenAI 官转分组",
      price: "2.0 元/刀",
      ratio: "20倍分组",
      icon: OpenAILogo,
      desc: ["OpenAI官方转发", "纯OpenAI线路", "NO AZ (非Azure)"],
      tags: ["原生体验", "官方直连"],
    },
    {
      title: "AWS 官转分组",
      price: "2.8 元/刀",
      ratio: "28倍分组",
      icon: AWSLogo,
      desc: ["AWS Claude官方转发", "纯AWS官转通道"],
      tags: ["Claude", "AWS"],
    },
    {
      title: "Gemini 分组",
      price: "0.5 元/刀",
      ratio: "5倍分组",
      icon: GeminiLogo,
      desc: ["Gemini官方转发", "Google原生通道"],
      tags: ["Google", "Gemini"],
    },
    {
      title: "Grok 分组",
      price: "2.0 元/刀",
      ratio: "20倍分组",
      icon: GrokLogo,
      desc: ["Grok全模型支持", "官方转发", "非逆向工程"],
      tags: ["xAI", "Grok"],
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      {/* Hero Section */}
      <motion.header 
        className="relative z-10 overflow-hidden bg-white text-slate-900 min-h-screen flex items-center"
        style={{ y: yBg }}
      >
        <Particles />
        <div className="relative z-10 w-full">
          <div className="max-w-5xl mx-auto px-6 py-24 lg:py-28 flex flex-col items-center text-center gap-9">
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.1, type: "spring", stiffness: 320, damping: 26 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/70 border border-slate-200 shadow-sm backdrop-blur"
            >
              <ZenLogo className="w-7 h-7 text-blue-600" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                Zen-AI Relay
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.18 }}
              className="space-y-5"
            >
              <h1 className="text-[42px] sm:text-[56px] md:text-[76px] font-black leading-[1.03] tracking-tight text-slate-900">
                ZEN-AI VIP
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 font-medium">
                致力于为企业和开发者提供最稳定、最高效的 AI 模型 API 中转服务。
              </p>
            </motion.div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <motion.a 
                href="https://vip.zen-ai.top/login" 
                initial={{ opacity: 0, y: 16, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.65, delay: 0.32, type: "spring", stiffness: 320, damping: 24 }}
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="px-7 py-3 rounded-full bg-slate-900 text-white font-semibold shadow-[0_20px_50px_-20px_rgba(15,23,42,0.6)]"
              >
                立即接入
              </motion.a>
              <motion.a 
                href="#pricing" 
                initial={{ opacity: 0, y: 16, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.65, delay: 0.38, type: "spring", stiffness: 320, damping: 24 }}
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="px-7 py-3 rounded-full border border-slate-200 text-slate-900 bg-white hover:bg-slate-50 transition-colors duration-200 shadow-[0_14px_30px_-22px_rgba(15,23,42,0.35)]"
              >
                Explore use cases
              </motion.a>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-3 max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">灵活的资源分组</h2>
              <p className="text-slate-600">
                从低价测试到生产稳态、企业 EA、原生 OpenAI / AWS / Gemini，分组计费、并发限额与独立密钥一站配置。
              </p>
              <div className="flex flex-wrap gap-2 text-sm text-slate-500">
                <span className="px-3 py-1 rounded-full bg-slate-100">多币种结算</span>
                <span className="px-3 py-1 rounded-full bg-slate-100">账期对账</span>
                <span className="px-3 py-1 rounded-full bg-slate-100">独立子账户</span>
                <span className="px-3 py-1 rounded-full bg-slate-100">0.1 元 / 1 USD</span>
              </div>
            </div>
            <a 
              href="https://t.me/kimojisatan" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-slate-900 text-white font-semibold shadow-sm hover:-translate-y-0.5 transition-transform"
            >
              联系销售咨询
            </a>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg, idx) => (
              <PricingCard key={idx} {...pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* Status Monitor Section */}
      <section id="status" className="py-20 bg-gradient-to-b from-slate-50 to-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center h-12 w-12 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <Activity className="text-emerald-500" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Live Monitor</p>
                <h2 className="text-2xl font-bold text-slate-900">服务状态与合规</h2>
              </div>
            </div>
            <a href="https://status.zen-ai.top/status/1" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:text-blue-700">
              查看完整历史 →
            </a>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              {[
                { title: "多云冗余", desc: "Azure / OpenAI / AWS / Gemini 独立路由池，自动切换" },
                { title: "金融级 SLA", desc: "全年 99.95% 目标，自动熔断与限流护航" },
                { title: "合规隔离", desc: "数据不落盘，动态令牌化与可审计日志" },
                { title: "实时可视", desc: "状态页由 Uptime Kuma 驱动，可随时查看全局健康度" },
              ].map((item, idx) => (
                <div key={idx} className="rounded-2xl bg-white border border-slate-200 px-4 py-4 shadow-sm">
                  <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                  <p className="text-sm text-slate-600 mt-1">{item.desc}</p>
                </div>
              ))}
            </div>

            <motion.div 
              className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden p-1 min-h-[420px] relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {iframeLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm z-10 rounded-3xl">
                  <Loader2 className="animate-spin text-blue-600" size={48} />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50 pointer-events-none" />
              <iframe 
                src="https://status.zen-ai.top/status/1"
                title="Service Status"
                className="w-full h-full rounded-2xl border-0 relative z-0 bg-white"
                loading="lazy"
                onLoad={() => setIframeLoading(false)}
              />
              <div className="absolute bottom-4 right-4 pointer-events-none opacity-60 text-xs text-slate-400 z-10">
                 Live Monitor · Uptime Kuma
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Access Portals */}
      <section id="access" className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">站点访问入口</h2>
              <p className="text-slate-600">根据角色选择入口，权限、额度与白名单策略分层管理。</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a 
                href="https://zen-ai-doc.apifox.cn/c" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold shadow-md hover:-translate-y-0.5 transition-transform"
              >
                快速接入文档
              </a>
              <a 
                href="https://t.me/kimojisatan" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-800 font-semibold hover:-translate-y-0.5 transition-transform"
              >
                企业咨询
              </a>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <LinkCard 
              title="企业用户站点" 
              url="https://vip.zen-ai.top" 
              desc="独享通道、密钥分组、审计日志，可配置账期与白名单。"
              primary={true}
            />
            <LinkCard 
              title="个人用户站点" 
              url="https://zen-ai.top" 
              desc="注册即用，默认限流保护，适合开发者与小型团队。"
            />
            <LinkCard 
              title="空白反代接口" 
              url="https://api.144096.xyz" 
              desc="纯净 API 入口，兼容 OpenAI 协议，可自带客户端密钥。"
            />
          </div>
        </div>
      </section>

      {/* Footer & Contact */}
      <footer id="contact" className="bg-slate-900 text-white py-20 relative overflow-hidden">
        {/* Animated background overlay */}
        <div className="absolute inset-0 z-0 opacity-10">
          <motion.div 
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-700 rounded-full blur-3xl"
            animate={{ x: [0, 50, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute -top-30 -right-30 w-96 h-96 bg-cyan-700 rounded-full blur-3xl"
            animate={{ x: [0, -50, 0], y: [0, 50, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-white rounded-full p-1">
                   <ZenLogo className="w-8 h-8" />
                </div>
                <span className="font-bold text-xl tracking-tight">ZEN-AI VIP</span>
              </div>
              <p className="text-slate-400 leading-relaxed max-w-sm">
                致力于为企业和开发者提供最稳定、最高效的 AI 模型 API 中转服务。支持 Azure OpenAI, Gemini, Claude, Grok 等主流模型。
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6 text-white">企业合作</h4>
              <ul className="space-y-4">
                <li>
                  <a href="https://t.me/kimojisatan" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-400 hover:text-blue-400 transition-colors">
                    <Send size={18} />
                    <span>Telegram: @kimojisatan</span>
                  </a>
                </li>
                <li>
                  <a href="mailto:kamipasi.han@gmail.com" className="flex items-center gap-3 text-slate-400 hover:text-blue-400 transition-colors">
                    <Mail size={18} />
                    <span>kamipasi.han@gmail.com</span>
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6 text-white">快捷链接</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#pricing" className="hover:text-white transition-colors">价格体系</a></li>
                <li><a href="https://status.zen-ai.top" className="hover:text-white transition-colors">服务监控</a></li>
                <li><a href="https://vip.zen-ai.top/register" className="hover:text-white transition-colors">注册账户</a></li>
                <li><a href="https://zen-ai-doc.apifox.cn/c" className="hover:text-white transition-colors">API 文档</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} ZEN-AI. All rights reserved.
            </p>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs text-slate-500">All Systems Operational</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
