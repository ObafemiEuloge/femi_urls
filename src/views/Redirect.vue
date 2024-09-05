<template>
  <div>
    <p></p>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const route = useRoute();

async function fetchAndRedirect() {
  const shortId = route.params.shortId;
  
  try {
    const docRef = doc(db, 'links', shortId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const longUrl = docSnap.data().longUrl;
      window.location.href = longUrl; // Rediriger vers l'URL longue
    } else {
      console.error('Aucune URL trouvée pour cet ID');
      // Afficher une erreur ou rediriger vers une page d'erreur
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'URL:', error);
  }
}

// Appeler la fonction pour rediriger
fetchAndRedirect();
</script>
