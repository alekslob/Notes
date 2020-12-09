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
            <BottomNavigation>
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
                            :listOfNotes="notesObject.getAllNotesForOwner(textFieldValue)" />
                    </Frame>
                </TabContentItem>
                <TabContentItem>
                    <Frame>
                        <List
                            :listOfNotes="notesObject.getFavoriteNotes(textFieldValue)" />
                    </Frame>
                </TabContentItem>

                <TabContentItem>
                    <Frame>
                        <Note @updateSaveIcon="onUpdateSaveIcon"
                            :listOfNotes="notesObject.getAllNotesForOwner(textFieldValue)"
                            :userId="userId" />
                    </Frame>
                </TabContentItem>
            </BottomNavigation>
        </GridLayout>
    </Page>
</template>

<script>
    import List from "./List";
    import Note from "./Note";
    import {
        Notes
    } from "../scripts/notes";
    export default {
        methods: {
            onUpdateSaveIcon(someDate) {
                // this.isEditingSave = someDate;
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
                this.onActionTitle = true;
                this.searchIcon = true;
                this.onSearch = false;
            }
        },
        components: {
            List,
            Note
        },
        props: ["userId"],
        data() {
            return {
                seen: true,
                textFieldValue: "",
                notesObject: new Notes(this.userId),
                onActionBar: false,
                onTitle: true,
                searchIcon: true,
                onSearch: false
            };
        }
    };
</script>

<style>
</style>