<template>
    <Page :actionBarHidden="onActionBar">
        <ActionBar title="Мои заметки">
            <!-- <Label v-if="onTitle" text="Мои заметки" /> -->
            <ActionItem @tap="onTapSearch" v-show="searchIcon"
                android.systemIcon="ic_menu_search" />
            <!-- <TextField v-if="onSearch" v-model="textFieldValue" hint="Search"
                @returnPress="backSearch" /> -->
            <GridLayout columns="auto, *" rows="*">
                <Label col="0" rows="0" text="Заметки" />
                <!--<ActionItem col="1" rows="0" @tap="onTapSearch"
                    v-show="searchIcon" android.systemIcon="ic_menu_search" /> -->
                <TextField col="1" rows="0" v-model="textFieldValue"
                    v-if="onSearch" hint="Search" @returnPress="backSearch" />
            </GridLayout>
        </ActionBar>
        <GridLayout>
            <BottomNavigation :selectedIndex="backIndex">
                <TabStrip>
                    <TabStripItem @tap="onListTap">
                        <Label text="Все"></Label>
                    </TabStripItem>
                    <TabStripItem @tap="onListTap">
                        <Label text="Важное"></Label>
                    </TabStripItem>

                    <TabStripItem @tap="onCreateTap">
                        <Label text="Создание"></Label>
                    </TabStripItem>
                </TabStrip>
                <TabContentItem>
                    <Frame>

                        <List
                            :listOfNotes="notesObject.getAllNotesForOwner(textFieldValue)"
                            @changeNote="onChangeNote"
                            @switchFavorit="onFavorit"
                            @switchDelete="onDelete" />
                    </Frame>
                </TabContentItem>
                <TabContentItem>
                    <Frame>
                        <List
                            :listOfNotes="notesObject.getFavoriteNotes(textFieldValue)"
                            @changeNote="onChangeNote"
                            @switchFavorit="onFavorit"
                            @switchDelete="onDelete" />
                    </Frame>
                </TabContentItem>

                <TabContentItem>
                    <Frame>
                        <Editor :note="sendNote" :userId="userId"
                            @updateSaveIcon="onUpdateSaveIcon" />
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
        methods: {
            onFavorit(someData) {
                this.notesObject.getNote(someData.noteId).switchFavorite();
            },
            onDelete(someData) {
                this.notesObject.deleteNote(someData.noteId);
            },
            onChangeNote(someData) {
                this.backIndex = 2;
                this.noteId = someData.noteId;
                this.sendNote = this.notesObject.getNote(this.noteId);
                this.onCreateTap();
            },
            onUpdateSaveIcon(someData) {
                this.backIndex = 0;
                // if (this.noteId >= 0) {
                //     this.notesObject.getNote(this.noteId).editNote(someData
                //         .note);
                // } else {
                this.notesObject.createNewNote(someData.note);
                // }
                this.noteId = -1;
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
        components: {
            List,
            Editor
        },
        props: ["userId", "backIndex"],
        data() {
            return {
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
</style>