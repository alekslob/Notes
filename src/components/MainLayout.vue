<template>
    <Page :actionBarHidden="onActionBar">
        <ActionBar backgroundColor="#009900">
            <ActionItem @tap="onTapSearch" v-show="searchIcon"
                android.systemIcon="ic_menu_search" />
            <GridLayout columns="auto, *" rows="*">
                <Label class="text" col="0" rows="0" :text="actionTitle" />
                <TextField  class="text" col="1" rows="0" v-model="textFieldValue"
                    v-if="onSearch" hint="Search" @returnPress="backSearch" />
            </GridLayout>
        </ActionBar>
        <GridLayout backgroundColor="#009900">
            <BottomNavigation :selectedIndex="backIndex">
                <TabStrip backgroundColor="#33cc66">
                    <TabStripItem @tap="onListTap" font-weight: 700;>
                        <Label   text="Все" fontSize="20"></Label>
                    </TabStripItem>
                    <TabStripItem @tap="onListTap">
                        <Label  text="Важное"fontSize="20"></Label>
                    </TabStripItem>
                    <TabStripItem @tap="onCreateTap">
                        <Label   text="Создание"fontSize="20"></Label>
                    </TabStripItem>
                </TabStrip>
                <TabContentItem>
                    <Frame>

                        <List
                            :listOfNotes="notesObject.getAllNotesForOwner(textFieldValue)"
                            @changeNote="onChangeNote"
                            @switchFavorit="onFavorit"
                            @switchDelete="onDelete" @switchItem="onItem" />
                    </Frame>
                </TabContentItem>
                <TabContentItem>
                    <Frame>
                        <List
                            :listOfNotes="notesObject.getFavoriteNotes(textFieldValue)"
                            @changeNote="onChangeNote"
                            @switchFavorit="onFavorit"
                            @switchDelete="onDelete" @switchItem="onItem" />
                    </Frame>
                </TabContentItem>

                <TabContentItem>
                    <Frame>
                        <Editor :note="sendNote"
                            @updateSaveIcon="onUpdateSaveIcon"
                            @backIcon="onBackFromEdit" />
                    </Frame>
                </TabContentItem>
            </BottomNavigation>
        </GridLayout>
    </Page>
</template>

<script>
    import List from "./List";
    import Editor from "./Editor";
    import {
        Notes,
        Note
    } from "./scripts/notes";
    export default {
        components: {
            List,
            Editor
        },
        props: ["userId", "backIndex"],
        methods: {
            onItem(someData) {
                this.actionTitle = someData.title;
            },
            onFavorit(someData) {
                this.actionTitle = "Moи заметки";

                this.notesObject.getNote(someData.noteId).switchFavorite();
            },
            onDelete(someData) {
                this.actionTitle = "Moи заметки";
                this.notesObject.deleteNote(someData.noteId);
            },
            onChangeNote(someData) {
                this.actionTitle = "Moи заметки";
                this.noteId = someData.noteId;
                this.onCreateTap();
                this.sendNote = new Note(this.notesObject.getNote(this
                    .noteId));
                this.backIndex = 2;
            },
            onUpdateSaveIcon(someData) {
                this.backIndex = 0;
                someData.note.ownerId = this.userId;
                if (this.noteId > 0) {
                    this.notesObject.getNote(this.noteId).editNote(someData
                        .note);
                } else {
                    this.notesObject.createNewNote(someData.note);
                }
                this.sendNote = new Note({
                    title: "",
                    content: ""
                });
                this.noteId = 0;
                this.onListTap();
            },
            onBackFromEdit() {
                this.backIndex = 0;
                this.sendNote = new Note({
                    title: "",
                    content: ""
                });
                this.noteId = 0;
                this.onListTap();
            },
            onCreateTap() {
                this.seen = false;
                // this.isEditingCancel = true;
                this.onActionBar = true;
            },
            onListTap() {
                this.seen = true;
                // this.isEditingCancel = false;
                // this.isEditingSave = false;
                this.onActionBar = false;
            },
            onTapSearch() {
                this.onActionTitle = false;
                this.searchIcon = false;
                this.onSearch = true;
            },
            backSearch() {
                if (this.onSearch) {
                    this.onActionTitle = true;
                    this.searchIcon = true;
                    this.onSearch = false;
                } else {
                    this.$navigateBack();
                }
            }
        },
        data() {
            return {
                actionTitle: "Мои заметки",
                seen: true,
                textFieldValue: "",
                notesObject: new Notes(this.userId),
                onActionBar: false,
                onTitle: true,
                searchIcon: true,
                onSearch: false,
                sendNote: new Note({
                    title: "",
                    comtent: ""
                })
            };
        }
    };
</script>

<style>
.text{
    color:#fff;
}
</style>