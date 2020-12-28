<template>
    <Page>
        <ActionBar title="Мои заметки" color="#fff" backgroundColor="#009900">
            <ActionItem @tap="onTapSave" v-show="isEditingSave"
                android.systemIcon="ic_menu_save" />
            <ActionItem @tap="onTapCancel" v-show="isEditingCancel"
                android.systemIcon="ic_menu_close_clear_cancel" />
            <ActionItem @tap="onTapBack" v-show="!isEditingCancel"
                android.systemIcon="ic_menu_back" />
        </ActionBar>
        <StackLayout height="100%">
            <TextView editable="true" height="50" @focus="onFocus"
                @textChange="onChange" @blur="onBlur"
                @returnPress="backСhange" v-model="textTitle"
                hint="Enter title">
                <FormattedString>
                    <Span :text="note.title" fontSize="20" />
                </FormattedString>
            </TextView>
            <TextView editable="true" height="60%" backgroundColor="#F0E68C"
                v-model="textContent" margin="20" @focus="onFocus"
                @blur="onBlur" @textChange="onChange"
                @returnPress="backСhange"
                hint="Enter content">
                <FormattedString>
                    <Span :text="note.content" fontSize="20" />
                </FormattedString>
            </TextView>
        </StackLayout>
    </Page>
</template>

<script>
    export default {
        props: ["note"],
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
                this.note.title = this.textTitle;
                this.note.content = this.textContent;
                this.note.date = new Date();
                this.$emit("updateSaveIcon", {
                    note: this.note
                });
            },
            onTapBack(){
                this.$emit("backIcon");
            }
        },
        data() {
            return {
                isEditingSave: false,
                isEditingCancel: false
            };
        }
    };
</script>

<style>
</style>