<template>
    <AppHeader fixed class="navbar-reverse">
        <SidebarToggler class="d-lg-none" display="md" mobile/>
        <b-link class="navbar-brand" to="#">
            <div class="navbar-brand-full">{{$store.state.settings.site_name || 'Bornodhoni CMS'}}</div>
            <div class="navbar-brand-minimized">{{$store.state.settings.site_short_name || 'BDCMS'}}</div>
        </b-link>
        <SidebarToggler class="d-md-down-none" display="lg" :defaultOpen=true></SidebarToggler>
        <b-navbar-nav class="d-md-down-none">
            <b-nav-item class="px-3" :to="{name:'Home'}">Dashboard</b-nav-item>
            <!--        <b-nav-item class="px-3" to="/users" exact>Users</b-nav-item>-->
            <!--        <b-nav-item class="px-3">Settings</b-nav-item>-->
        </b-navbar-nav>
        <b-navbar-nav class="navbar-center d-none" id="main-loader">
            <div class="spinner-border text-primary" style="z-index: 99999;" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
            <!--            <b-nav-item class="d-md-down-none">-->
            <!--                <i class="icon-bell"></i>-->
            <!--                <b-badge pill variant="danger">5</b-badge>-->
            <!--            </b-nav-item>-->
            <!--            <b-nav-item class="d-md-down-none">-->
            <!--                <i class="icon-list"></i>-->
            <!--            </b-nav-item>-->
            <!--            <b-nav-item class="d-md-down-none">-->
            <!--                <i class="icon-location-pin"></i>-->
            <!--            </b-nav-item>-->
            <DefaultHeaderDropdownAccnt/>
        </b-navbar-nav>
        <!--        <AsideToggler class="d-none d-lg-block"/>-->
        <!--<AsideToggler class="d-lg-none" mobile />-->
    </AppHeader>
</template>
<script>
    import {Header as AppHeader, SidebarToggler, AsideToggler} from '@coreui/vue'
    import DefaultHeaderDropdownAccnt from './DefaultHeaderDropdownAccnt'

    export default {
        name: 'DefaultHeader',
        components: {
            AsideToggler,
            AppHeader,
            DefaultHeaderDropdownAccnt,
            SidebarToggler
        }
    }
</script>
<style>
    .navbar-nav.navbar-center {
        position: absolute;
        left: 50%;
        transform: translatex(-50%);
    }
</style>
