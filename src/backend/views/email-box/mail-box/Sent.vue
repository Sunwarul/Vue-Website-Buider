<template>
    <div>
        <b-card
            :title="(!_.isUndefined(title) ? title: null) || ($route.meta?($route.meta.title || $route.meta.name) : $route.name)">

            <template slot="header">
                <dt-header :disable_add_button="!can('can_send_outbox')" :custom_buttons="custom_buttons"
                           :datatable="datatable" :fields="fields"
                           v-model="search"></dt-header>
            </template>
            <b-table ref="datatable" variant="primary" responsive="md" hover bordered small striped
                     head-variant="dark"
                     :items="getItems"
                     :fields="fields" id="datatable" :filter="search"
                     :per-page="datatable.per_page" :current-page="datatable.current_page"
            >
                <template v-slot:cell(photo)="row">
                    <b-img-lazy fluid style="max-width: 60px" v-if="row.item.photo"
                                :src="row.item.photo"></b-img-lazy>
                    <template v-else></template>
                </template>
                <template v-slot:cell(description)="row">
                    {{_.truncate(row.item.description,40)}}
                </template>
                <template v-slot:cell(action)="row">
                    <b-button-group size="sm">
                        <b-button variant="primary" v-if="can('can_view_outbox')" @click="currentItem=row.item"
                                  v-b-modal.viewModal>
                            <i class="fa fa-eye"></i>
                        </b-button>
                        <b-button variant="warning" v-if="can('can_send_outbox')"
                                  @click="()=>{
                                      form=JSON.parse(JSON.stringify(row.item));
                                      form.to=JSON.parse(form.to).map(e=>e.email).join(',')
                                  }"
                                  v-b-modal.addModal>
                            <i class="fa fa-edit"></i>
                        </b-button>
                        <b-button variant="danger" v-if="can('can_delete_outbox')" @click="trash(row.item.id)"><i
                            class="fa fa-trash"></i></b-button>
                    </b-button-group>
                </template>
            </b-table>
            <template slot="footer">
                <dt-footer :datatable="datatable"></dt-footer>
            </template>
        </b-card>
        <b-modal id="addModal" v-if="can('can_send_outbox')" :title="add_modal_title " size="lg"
                 header-bg-variant="dark">
            <b-form @submit.prevent="onSubmit">
                <b-form-group label="Recipient Email *">
                    <b-form-input v-model="form.to" type="email" multiple placeholder="To : Comma Separated"
                                  :required="true"></b-form-input>
                </b-form-group>
                <b-form-group label="Subject *">
                    <b-form-input v-model="form.subject" placeholder="Email Subject" :required="true"></b-form-input>
                </b-form-group>
                <b-form-group label="CC">
                    <b-form-input v-model="form.cc" placeholder="CC : Comma Separated"></b-form-input>
                </b-form-group>
                <b-form-group label="BCC">
                    <b-form-input v-model="form.bcc" placeholder="BCC : Comma Separated"></b-form-input>
                </b-form-group>
                <b-form-group label="Email Body">
                    <vue-editor v-model="form.body"></vue-editor>
                </b-form-group>
                <b-form-group label="Attachments">
                    <b-form-file v-model="form.attachments" multiple placeholder="Select Attachments"></b-form-file>
                </b-form-group>
                <b-button variant="primary" hidden ref="add_form_submit" type="submit">SUBMIT</b-button>
            </b-form>
            <div slot="modal-footer" class="w-100">
                <b-button-group class="float-right">
                    <b-button variant="primary" @click="$refs.add_form_submit.click()">SEND</b-button>
                    <b-button @click="$bvModal.hide('addModal')">Close</b-button>
                </b-button-group>
            </div>
        </b-modal>
        <b-modal id="viewModal" v-if="can('can_view_outbox')"
                 :title="'Subject : ' +( currentItem?currentItem.subject:'Untitled')" size="xl"
                 header-bg-variant="dark" no-body ok-only>
            <b-card>
                <template v-slot:header>
                    <b-row>
                        <b-col v-html="'To: '+getTo(currentItem.to)"></b-col>
                        <b-col class="text-right">
                            {{currentItem.created_at}}
                        </b-col>
                    </b-row>
                </template>
                <div class="embed-responsive embed-responsive-16by9">
                    <iframe class="embed-responsive-item" :srcdoc="currentItem.body" allowfullscreen></iframe>
                </div>
                <template v-slot:footer>
                    <b-row>
                        <b-col md="3" v-for="(attachment,akey) in JSON.parse(currentItem.attachments || '[]')"
                               :key="akey">
                            <a :href="attachment" download target="_blank">{{attachment}}</a>
                        </b-col>
                    </b-row>
                </template>
            </b-card>
        </b-modal>
    </div>
</template>

<script>
    import DtHeader from './../../../components/DtHeader'
    import DtFooter from './../../../components/DtFooter'
    import DataTable from './../../../mixins/DataTable'
    import jToFD from "json-form-data";
    import {VueEditor} from "vue2-editor";

    export default {
        name: "MailBox",
        mixins: [DataTable],
        components: {
            DtHeader,
            DtFooter,
            VueEditor
        },
        data() {
            return {
                title: 'Mail Box',
                add_modal_title: 'Add / Edit Email',
                view_modal_title: 'View Email',
                api_url: this.$store.state.routes['Bornodhoni.EmailBox.Sent.List'],
                trash_url: this.$store.state.routes['Bornodhoni.EmailBox.Delete'],
                submit_url: this.$store.state.routes['Bornodhoni.EmailBox.Sent.Add'],
                form: {},
                fields: [
                    {key: 'id', sortable: true, visible: true},
                    {key: 'subject', sortable: false, visible: true},
                    {
                        key: 'to', sortable: false, visible: true, formatter: (value) => {
                            let to = JSON.parse(value);
                            let out = '';
                            to.forEach(t => {
                                out += t.email + ', ';
                            });
                            return out;
                        }
                    },
                    {key: 'from', sortable: false, visible: true},
                    {
                        key: 'cc', sortable: true, visible: true, formatter: (value) => {
                            let to = JSON.parse(value);
                            let out = '';
                            to.forEach(t => {
                                out += t.email + ', ';
                            });
                            return out;
                        }
                    },
                    {
                        key: 'bcc', sortable: true, visible: true, formatter: (value) => {
                            let to = JSON.parse(value);
                            let out = '';
                            to.forEach(t => {
                                out += t.email + ', ';
                            });
                            return out;
                        }
                    },
                    {
                        key: 'text', label: 'Content', sortable: true, visible: true, formatter: (value) => {
                            return this._.truncate(value, {
                                length: 30
                            });
                        }
                    },
                    {key: 'created_at', sortable: true, visible: true},
                    {key: 'action', sortable: false, searchable: false, thClass: 'text-right', tdClass: 'text-right'},
                ],
                custom_buttons: []
            }
        },
        methods: {
            getTo(items) {
                if (items) {
                    return JSON.parse(items).map(e => e.email).join(", ");
                }
                return null;
            }
        }
    }
    // https://stackoverflow.com/questions/51406380/how-can-i-display-the-html-email-body-in-a-scrollable-table-cell
</script>
