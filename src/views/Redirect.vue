<template>
  <div>
    <p>Redirection en cours...</p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const route = useRoute();
const router = useRouter();

onMounted(async () => {
  const shortId = route.params.shortId;

  try {
    const docRef = doc(db, 'links', shortId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const longUrl = docSnap.data().longUrl;
      window.location.href = longUrl; // Redirection vers l'URL longue
    } else {
      console.error('Aucune URL trouvée pour cet ID');
      router.push('/'); // Redirection en cas d'ID invalide
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'URL:', error);
    router.push('/'); // Redirection en cas d'erreur
  }
});
</script>
