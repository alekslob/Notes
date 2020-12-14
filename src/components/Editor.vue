<template>
    <Page>
        <ActionBar title="Мои заметки">
            <ActionItem @tap="onTapSave" v-show="isEditingSave"
                android.systemIcon="ic_menu_save" />
            <ActionItem @tap="onTapCancel" v-show="isEditingCancel"
                android.systemIcon="ic_menu_close_clear_cancel" />
        </ActionBar>
        <StackLayout height="100%">
            <TextView editable="true" height="50" @focus="onFocus"
                @textChange="onChange" @blur="onBlur"
                @returnPress="backСhange" v-model="textTitle"
                hint="Enter title">
                <!-- <FormattedString>
                    <Span :text="textTitle" fontSize="20" />
                </FormattedString> -->
            </TextView>
            <TextView editable="true" height="60%" backgroundColor="gray"
                v-model="textContent" margin="20" @focus="onFocus"
                @blur="onBlur" @textChange="onChange"
                @returnPress="backСhange"
                hint="Enter content">
                <!-- <FormattedString>
                    <Span :text="textContent" fontSize="20" />
                </FormattedString> -->
            </TextView>
        </StackLayout>
    </Page>
</template>

<script>
    export default {
        props: ["note", "userId"],
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
                this.textTitle = this.note.title;
                this.textContent = this.note.content;
                this.isEditingSave = false;
                this.isEditingCancel = false;
            },
            onTapSave() {
                // const note = new Note({
                //     title: this.textTitle,
                //     content: this.textContent,
                //     date: new Date()
                // });
                this.note.title = this.textTitle;
                this.note.content = this.textContent;
                this.note.isOpened = true;
                this.note.userId = this.userId;
                this.note.date = new Date();
                this.$emit("updateSaveIcon", {
                    note: this.note
                });
            }
        },
        data() {
            return {
                textTitle: this.note.title,
                textContent: this.note.content,
                isEditingSave: false,
                isEditingCancel: false
            };
        }
    };
</script>

<style>
</style>