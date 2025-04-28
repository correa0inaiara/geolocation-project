<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://bulma.io">
        <div class="logo">
          <img class="logo__icon" src="../../assets/geolocation-icon.png" alt="3D icon with giant red pin over an open purple map with green borders">
          <span>Geolocation Project</span>
        </div>
      </a>

      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <RouterLink to="/" class="navbar-item">
          Home
        </RouterLink>

        <a class="navbar-item">
          Users
        </a>

        <a class="navbar-item">
          Regions
        </a>

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            Searches
          </a>

          <div class="navbar-dropdown">
            <a class="navbar-item">
              Regions By Point
            </a>
            <a class="navbar-item is-selected">
              Regions By Distance
            </a>
            <hr class="navbar-divider">
            <a class="navbar-item">
              Coordinates From Address
            </a>
            <a class="navbar-item">
              Address From Coordinates
            </a>
          </div>
        </div>

        <RouterLink to="/credits" class="navbar-item">
          Credits
        </RouterLink>
      </div>

      <!-- <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary">
              <strong>Sign up</strong>
            </a>
            <a class="button is-light">
              Log in
            </a>
          </div>
        </div>
      </div> -->
    </div>
  </nav>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
  name: "NavbarComponent",
})
</script>

<style scoped></style>