<template>
  <div class="user-playlists">
    <h2>My Playlists</h2>
    <div v-if="playlists">
      <ListViewVue :playlists="playlists" />
    </div>
    <router-link :to="{ name: 'CreatePlaylist' }" class="btn">Create a New Playlist</router-link>
  </div>
</template>

<script>
import getCollection from "@/composables/getCollection";
import getUser from "@/composables/getUser";
import ListViewVue from "@/components/ListView.vue";

export default {
  components: { ListViewVue },
  setup() {
    const { user } = getUser();
    const { error, documents: playlists } = getCollection("playlists", [
      "userId",
      "==",
      user.value.uid,
    ]);

    return { playlists };
  },
};
</script>