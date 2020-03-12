<template>
    <AppHeaderDropdown right no-caret>
        <template slot="header">
            <img
                :src="settings.auth_user.profile && settings.auth_user.profile.file_name ? settings.auth_user.profile.file_name : '' "
                class="img-avatar"
                :alt="settings.auth_user.name"/>
        </template>
        <template slot="dropdown">
            <!--            <b-dropdown-header tag="div" class="text-center"><strong>Account</strong></b-dropdown-header>-->
            <!--            <b-dropdown-item><i class="fa fa-bell-o"/> Updates-->
            <!--                <b-badge variant="info">{{ itemsCount }}</b-badge>-->
            <!--            </b-dropdown-item>-->
            <!--            <b-dropdown-item><i class="fa fa-envelope-o"/> Messages-->
            <!--                <b-badge variant="success">{{ itemsCount }}</b-badge>-->
            <!--            </b-dropdown-item>-->
            <!--            <b-dropdown-item><i class="fa fa-tasks"/> Tasks-->
            <!--                <b-badge variant="danger">{{ itemsCount }}</b-badge>-->
            <!--            </b-dropdown-item>-->
            <!--            <b-dropdown-item><i class="fa fa-comments"/> Comments-->
            <!--                <b-badge variant="warning">{{ itemsCount }}</b-badge>-->
            <!--            </b-dropdown-item>-->
            <b-dropdown-header
                tag="div"
                class="text-center">
                <strong>Settings</strong>
            </b-dropdown-header>
            <!--            <b-dropdown-item><i class="fa fa-user"/> Profile</b-dropdown-item>-->
            <!--            <b-dropdown-item><i class="fa fa-wrench"/> Settings</b-dropdown-item>-->
            <!--            <b-dropdown-item><i class="fa fa-usd"/> Payments-->
            <!--                <b-badge variant="secondary">{{ itemsCount }}</b-badge>-->
            <!--            </b-dropdown-item>-->
            <!--            <b-dropdown-item><i class="fa fa-file"/> Projects-->
            <!--                <b-badge variant="primary">{{ itemsCount }}</b-badge>-->
            <!--            </b-dropdown-item>-->
            <!--            <b-dropdown-divider/>-->
            <!--            <b-dropdown-item><i class="fa fa-shield"/> Lock Account</b-dropdown-item>-->
            <b-dropdown-item @click="logout"><i class="fa fa-lock"/> Logout</b-dropdown-item>
            <b-dropdown-item v-if="can_manage_profile" :to="{name:'MyProfile'}"><i class="fa fa-lock"/>
                My Profile
            </b-dropdown-item>
        </template>
    </AppHeaderDropdown>
</template>

<script>
    import {HeaderDropdown as AppHeaderDropdown} from '@coreui/vue'

    export default {
        name: 'DefaultHeaderDropdownAccnt',
        components: {
            AppHeaderDropdown
        },
        data: () => {
            return {
                itemsCount: 42,
                settings: {},
                can_manage_profile: false
            }
        },
        created() {
            this.settings = window.settings;
            this.can_manage_profile = this.$store.state.abilities.can_access_my_profile;
        },
        methods: {
            logout() {
                axios.post(this.$store.state.routes['logout'])
                    .then(res => {
                        console.log(res);
                    })
                    .catch(err => {
                        console.log(err.response);
                        //manage redirection globally from bootstrap.js
                        // if (err.response.status == 401) {
                        //     window.location.href = window.location.origin;
                        // }
                    });
            }
        }
    }
</script>
