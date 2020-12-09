<template>
    <Page>
        <ActionBar title="Мои заметки">
            <ActionItem @tap="onTapSave" v-show="isEditingSave"
                android.systemIcon="ic_menu_send" />
            <ActionItem @tap="onTapCancel" v-show="isEditingCancel"
                android.systemIcon="ic_menu_close_clear_cancel" />
        </ActionBar>
        <StackLayout height="100%">
            <TextView editable="true" height="50" v-model="textTitle"
                @focus="onFocus" @textChange="onChange" @blur="onBlur"
                @returnPress="backСhange">
                <FormattedString>
                    <Span text="Enter Title..." fontSize="20" />
                </FormattedString>
            </TextView>
            <TextView editable="true" height="60%" backgroundColor="gray"
                v-model="textContent" margin="20" @focus="onFocus"
                @blur="onBlur" @textChange="onChange"
                @returnPress="backСhange">
                <FormattedString>
                    <Span text="Enter Title..." fontSize="20" />
                </FormattedString>
            </TextView>
        </StackLayout>
    </Page>
</template>

<script>
    import {
        Note
    } from "../scripts/notes";
    export default {
        props: ["listOfNotes", "userId", "noteId"],
        methods: {
            onFocus() {
                this.isEditingCancel = true;
            },
            onChange() {
                if (this.isEditingCancel) {
                    // this.isEditingCancel = !this.isEditingCancel;
                    this.isEditingSave = true;
                }
            },
            onTapCancel() {
                this.textTitle = "";
                this.textContent = "";
                this.isEditingSave = false;
                this.isEditingCancel = false;
            }
        },
        // created() {
        //     if (this.noteId) {
        //         var note = this.notes.getNotes(id);
        //         this.textTitle = note.title;
        //         this.textContent = note.content;
        //     }
        // },
        data() {
            return {
                textTitle: "",
                textContent: "",
                isEditingSave: false,
                isEditingCancel: false
            };
        }
    };
</script>

<style>

</style>