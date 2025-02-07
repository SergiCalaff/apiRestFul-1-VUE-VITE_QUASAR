<template>
    <div class="q-pa-md">
      <q-layout view="hHh Lpr lff" container class="shadow-2" style="height: 100vh; margin: 0;">
        <q-header elevated :class="$q.dark.isActive ? 'bg-secondary' : 'bg-black'">
          <q-toolbar>
            <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
            <q-toolbar-title>Header</q-toolbar-title>
          </q-toolbar>
        </q-header>
  
        <q-drawer
          v-model="drawer"
          show-if-above
  
          :mini="miniState"
          @mouseenter="miniState = false"
          @mouseleave="miniState = true"
  
          :width="200"
          :breakpoint="500"
          bordered
          :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
        >
          <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">
            <q-list padding>
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-icon name="inbox" />
                </q-item-section>
  
                <q-item-section>
                  Inbox
                </q-item-section>
              </q-item>
  
              <q-item active clickable v-ripple>
                <q-item-section avatar>
                  <q-icon name="star" />
                </q-item-section>
  
                <q-item-section>
                  Star
                </q-item-section>
              </q-item>
  
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-icon name="send" />
                </q-item-section>
  
                <q-item-section>
                  Send
                </q-item-section>
              </q-item>
  
              <q-separator />
  
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-icon name="drafts" />
                </q-item-section>
  
                <q-item-section>
                  Drafts
                </q-item-section>
              </q-item>
            </q-list>
          </q-scroll-area>
        </q-drawer>
  
        <q-page-container style="height: 100vh;">
            <router-view />
            <!--<h1>Hola estamos en page container de mainlayout</h1>-->
        </q-page-container>
      </q-layout>
    </div>
  </template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    return {
      drawer: ref(false),
      miniState: ref(true)
    }
  }
}
</script>