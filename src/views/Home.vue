<template>
    <div class="app-container">
        <div class="mb-8">
            <h1 class="font-bold text-5xl lg:text-7xl">
                <span class="text-red-500">fèmi</span>.urls
            </h1>
            <p class="description text-xl lg:text-2xl">
                Simplifiez vos liens avec notre générateur d'URLs courtes.
            </p>
        </div>

        <!-- Champ pour entrer l'URL longue -->
        <div class="mx-2 w-[90%]">
            <input v-model="longUrl" type="text" placeholder="Entrez votre lien long ici"
                class="input lg:w-[60vw] p-3 text-gray-900 font-semibold border border-gray-700 rounded-xl bg-gray-800 w-full"
                name="text" />
        </div>

        <!-- Bouton pour générer le lien court -->
        <button @click="generateShortUrl" class="boton-elegante">Générer mon lien</button>

        <div v-if="shortUrl">
            <p class="text-xl text-gray-300 mt-8">Votre nouveau lien :</p>
            <div class="flex items-center">
                <div class="flex items-center">
                    <!-- Attribuez une référence à l'élément d'entrée -->
                    <div :value="fullShortUrl" ref="shortUrlInput" readonly
                        class="lg:w-[60vw] p-3 text-gray-200 font-semibold w-full">{{ fullShortUrl }}
                    </div>
                    <!-- <button @click="copyToClipboard" class="ml-2 boton-elegante">Copier</button> -->
                    <button class="copy" @click="copyToClipboard">
                        <span data-text-end="Lien copié!" data-text-initial="Copier le lien" class="tooltip"></span>
                        <span>
                            <svg xml:space="preserve" style="enable-background:new 0 0 512 512" viewBox="0 0 6.35 6.35"
                                y="0" x="0" height="20" width="20" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" class="clipboard">
                                <g>
                                    <path fill="currentColor"
                                        d="M2.43.265c-.3 0-.548.236-.573.53h-.328a.74.74 0 0 0-.735.734v3.822a.74.74 0 0 0 .735.734H4.82a.74.74 0 0 0 .735-.734V1.529a.74.74 0 0 0-.735-.735h-.328a.58.58 0 0 0-.573-.53zm0 .529h1.49c.032 0 .049.017.049.049v.431c0 .032-.017.049-.049.049H2.43c-.032 0-.05-.017-.05-.049V.843c0-.032.018-.05.05-.05zm-.901.53h.328c.026.292.274.528.573.528h1.49a.58.58 0 0 0 .573-.529h.328a.2.2 0 0 1 .206.206v3.822a.2.2 0 0 1-.206.205H1.53a.2.2 0 0 1-.206-.205V1.529a.2.2 0 0 1 .206-.206z">
                                    </path>
                                </g>
                            </svg>
                            <svg xml:space="preserve" style="enable-background:new 0 0 512 512" viewBox="0 0 24 24" y="0"
                                x="0" height="18" width="18" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" class="checkmark">
                                <g>
                                    <path data-original="#000000" fill="currentColor"
                                        d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z">
                                    </path>
                                </g>
                            </svg>
                        </span>
                    </button>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

// Variables pour stocker les URLs
const longUrl = ref('');
const shortUrl = ref(''); // ID généré
const router = useRouter();
const copyStatus = ref('Copy to clipboard'); // État pour le message de confirmation

async function generateShortUrl() {
    const shortId = generateRandomShortUrl();
    const longUrlValue = longUrl.value;

    try {
        const docRef = doc(db, 'links', shortId);
        await setDoc(docRef, { longUrl: longUrlValue });
        shortUrl.value = shortId;
    } catch (error) {
        console.error('Erreur lors de la génération de l\'URL courte:', error);
    }
}

function generateRandomShortUrl() {
    return Math.random().toString(36).substr(2, 8);
}

const shortUrlInput = ref(null);

async function copyToClipboard() {
    const inputElement = shortUrlInput.value;
    if (inputElement) {
        try {
            await navigator.clipboard.writeText(inputElement.innerText);
            copyStatus.value = 'Lien copié!'; // Mise à jour du message de confirmation
        } catch (error) {
            console.error('Erreur lors de la copie dans le presse-papiers:', error);
        }
    } else {
        console.error("L'élément d'entrée n'est pas disponible.");
    }
}


// Créer l'URL complète à afficher
const fullShortUrl = computed(() => `https://femiurls.netlify.app/${shortUrl.value}`);
</script>





<style scoped>
.app-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    overflow: hidden;
    background-color: #1a1a1a;
    text-align: center;
    font-family: 'DM Sans', sans-serif;
}

h1 {
    color: #868686;
}

.description {
    font-family: 'DM Sans';
    margin-bottom: 10px;
    color: #666;
}

.url-input {
    width: 300px;
    padding: 10px;
    font-size: 1rem;
    color: #fff;
    background-color: #1a1a1a;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.generate-button {
    padding: 10px 20px;
    font-size: 1rem;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.generate-button:hover {
    background-color: #0056b3;
}


/* From Uiverse.io by iZOXVL */
.boton-elegante {
    padding: 15px 50px;
    margin-top: 2rem;
    border: 2px solid #2c2c2c;
    background-color: #1a1a1a;
    color: #ffffff;
    cursor: pointer;
    border-radius: 30px;
    transition: all 0.4s ease;
    outline: none;
    position: relative;
    overflow: hidden;
    font-weight: bold;
}

.boton-elegante::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    margin-top: 5rem;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle,
            rgba(255, 255, 255, 0.25) 0%,
            rgba(255, 255, 255, 0) 70%);
    transform: scale(0);
    transition: transform 0.5s ease;
}

.boton-elegante:hover::after {
    transform: scale(4);
}

.boton-elegante:hover {
    border-color: #666666;
    background: #292929;
}

.input {
    /* background-color: #292929; */
    border: 1px solid #3e3e3e;
    border-radius: 8px;
    background-color: #1a1a1a;
    color: #c7c7c7;
    font-weight: 600;
    padding: 14px 24px;
    text-decoration: none;
    font-size: 16px;
    cursor: pointer;
}

.input:hover {
    border: 1px solid #2c2c2c;
}










/* From Uiverse.io by Galahhad */
/* tooltip settings 👇 */

.copy {
    /* button */
    --button-bg: #353434;
    --button-hover-bg: #464646;
    --button-text-color: #CCCCCC;
    --button-hover-text-color: #8bb9fe;
    --button-border-radius: 10px;
    --button-diameter: 36px;
    --button-outline-width: 1px;
    --button-outline-color: rgb(141, 141, 141);
    /* tooltip */
    --tooltip-bg: #f4f3f3;
    --toolptip-border-radius: 4px;
    --tooltip-font-family: Menlo, Roboto Mono, monospace;
    /* 👆 this field should not be empty */
    --tooltip-font-size: 12px;
    /* 👆 this field should not be empty */
    --tootip-text-color: rgb(50, 50, 50);
    --tooltip-padding-x: 7px;
    --tooltip-padding-y: 7px;
    --tooltip-offset: 8px;
    /* --tooltip-transition-duration: 0.3s; */
    /* 👆 if you need a transition, 
  just remove the comment,
  but I didn't like the transition :| */
}

.copy {
    box-sizing: border-box;
    width: var(--button-diameter);
    height: var(--button-diameter);
    border-radius: var(--button-border-radius);
    background-color: var(--button-bg);
    color: var(--button-text-color);
    border: none;
    cursor: pointer;
    position: relative;
    outline: none;
}

.tooltip {
    position: absolute;
    opacity: 0;
    visibility: 0;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    font: var(--tooltip-font-size) var(--tooltip-font-family);
    color: var(--tootip-text-color);
    background: var(--tooltip-bg);
    padding: var(--tooltip-padding-y) var(--tooltip-padding-x);
    border-radius: var(--toolptip-border-radius);
    pointer-events: none;
    transition: all var(--tooltip-transition-duration) cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.tooltip::before {
    content: attr(data-text-initial);
}

.tooltip::after {
    content: "";
    position: absolute;
    bottom: calc(var(--tooltip-padding-y) / 2 * -1);
    width: var(--tooltip-padding-y);
    height: var(--tooltip-padding-y);
    background: inherit;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    z-index: -999;
    pointer-events: none;
}

.copy svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.checkmark {
    display: none;
}

/* actions */

.copy:hover .tooltip,
.copy:focus:not(:focus-visible) .tooltip {
    opacity: 1;
    visibility: visible;
    top: calc((100% + var(--tooltip-offset)) * -1);
}

.copy:focus:not(:focus-visible) .tooltip::before {
    content: attr(data-text-end);
}

.copy:focus:not(:focus-visible) .clipboard {
    display: none;
}

.copy:focus:not(:focus-visible) .checkmark {
    display: block;
}

.copy:hover,
.copy:focus {
    background-color: var(--button-hover-bg);
}

.copy:active {
    outline: var(--button-outline-width) solid var(--button-outline-color);
}

.copy:hover svg {
    color: var(--button-hover-text-color);
}
</style>
