<template>
    <Page :actionBarHidden="onAction">
        <ActionBar>
            <!-- ActionItem @tap="onFavorit" v-show="true"
                android.systemIcon="big_star_off" />
            <ActionItem @tap="onDelete" v-show="true"
                android.systemIcon="ic_menu_send" /> -->
            <GridLayout columns="auto, *" row="auto">
                <Button col="0" row="0" text="Важн" @tap="onFavorit" />
                <Button col="1" row="0" text="редакт" @tap="onEdit" />
                <Button col="2" row="0" text="Удалить" @tap="onDelete" />
            </GridLayout>
        </ActionBar>
        <ScrollView>
            <StackLayout height="100%" class="home-panel">
                <RadListView ref="listView" for="item in listOfNotes"
                    @itemHold="onItemHold" @itemTap="onItemSelected"
                    separatorColor="red">
                    <!-- v-bind:class="{itemTaped: selectedItems.includes(item.id)}" -->
                    <v-template>
                        <StackLayout backgroundColor="green"
                            class="note-block" orientation="vertical">
                            <Label :text="item.title" class="titleLabel">
                            </Label>
                            <Label :text="item.content" class="contentLabel">
                            </Label>
                            <Label :text="item.date" class="dateLabel">
                            </Label>
                        </StackLayout>
                    </v-template>
                    <v-template if="selectedItems.includes(item.id)">
                        <StackLayout backgroundColor="red" class="note-block"
                            orientation="vertical">
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
    // import Note from "./Note";

    Vue.use(RadListView);

    export default {
        props: ["listOfNotes", "seen"],
        methods: {
            onFavorit() {
                this.onAction = true;
                // this.listOfNotes.getNote(this.itemSelected).switchFavorite();
                this.$emit("switchFavorit", {
                    noteId: this.itemSelected
                });
                this.itemSelected = -1;
                // this.backColorItem = "green";
            },
            onEdit() {
                this.onAction = true;
                this.$emit("changeNote", {
                    noteId: this.itemSelected
                });
            },
            onDelete() {
                this.onAction = true;
                // this.listOfNotes.deleteNote(this.itemSelected);
                this.$emit("switchDelete", {
                    noteId: this.itemSelected
                });
                this.itemSelected = -1;
                // this.selectedItems = [];
                // this.backColorItem = "green";
            },
            onItemSelected(event) {
                this.onAction = false;
                this.textbutton = event.item.title;
                this.itemSelected = event.item.id;
                this.$emit("switchItem", {
                    title: this.textbutton
                });
                // this.selectedItems.push(itemSelected);
            }
        },
        data() {
            return {
                onAction: true,
                // backColorItem: "gray",
                itemSelected: -1,
                textbutton: "Отметить важным",
                selectedItems: [2, 3]
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