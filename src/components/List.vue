<template>
    <Page>
        <!-- :actionBarHidden="onAction"> -->
        <ActionBar>
            <ActionItem @tap="onFavorit" v-show="true"
                android.systemIcon="big_star_off" />
            <ActionItem @tap="onDelete" v-show="true"
                android.systemIcon="ic_menu_send" />

            <!--
                <GridLayout columns="auto, *" row="auto">
                <Button col="0" row="0" :text="textbutton" @tap="onFavorit" />
                <Button col="1" row="0" text="Удалить" @tap="onDelete" />
                </GridLayout> -->
        </ActionBar>
        <ScrollView>
            <StackLayout height="100%" class="home-panel">
                <RadListView ref="listView" for="item in listOfNotes"
                    @itemHold="onItemSelected" @itemTap="onItemTap">
                    <v-template>
                        <StackLayout
                            v-bind:class="{itemTaped: selectedItems.includes(item.id)}"
                            class="note-block" orientation="vertical">
                            <Label :text="item.title" class="titleLabel">
                            </Label>
                            <Label :text="item.content" class="contentLabel">
                            </Label>
                            <Label :text="item.date" class="dateLabel">
                            </Label>
                        </StackLayout>
                    </v-template>
                </RadListView>
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
    import Vue from "nativescript-vue";
    import RadListView from "nativescript-ui-listview/vue";
    import Note from "./Note";

    Vue.use(RadListView);

    export default {
        props: ["listOfNotes", "seen"],
        methods: {
            onItemHold() {
                this.onAction = false;
                // this.backColorItem = "green";
            },
            onFavorit() {
                this.onAction = true;
                // this.backColorItem = "green";
            },
            onDelete() {
                this.onAction = true;
                this.selectedItems = [];
                // this.backColorItem = "green";
            },
            onItemTap(item) {
                this.seen = false;
                this.textbutton = item;
                this.selectedItems = [];
                // this.onAction = false;
            },
            onItemSelected({
                index,
                object
            }) {
                this.onAction = false;
                const itemSelected = this.listOfNotes[index];
                this.selectedItems.push(itemSelected);
            }
        },
        data() {
            return {
                onAction: true,
                // backColorItem: "gray",
                textbutton: "Отметить важным",
                selectedItems: []
            };
        }
    };
</script>

<style>
    .itemTaped {
        background-Color: green
    }

    .itemNotTaped {
        background-Color: gray
    }
</style>