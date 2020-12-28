<template>
    <Page :actionBarHidden="onAction">
        <ActionBar backgroundColor="#009900">
            <!-- ActionItem @tap="onFavorit" v-show="true"
                android.systemIcon="big_star_off" />
            <ActionItem @tap="onDelete" v-show="true"
                android.systemIcon="ic_menu_send" /> -->
            <GridLayout columns="auto, auto, *" row="auto" >
                <Button col="0" row="0" text="Важное" @tap="onFavorit" />
                <Button col="1" row="0" text="Редактировать" @tap="onEdit" />
                <Button col="2" row="0" text="Удалить" @tap="onDelete" />
            </GridLayout>
        </ActionBar>
        <ScrollView>
            <StackLayout height="100%" backgroundColor="#FFF">
                <RadListView ref="listView" for="item in listOfNotes"
                    @itemHold="onItemHold" @itemTap="onItemSelected"
                    separatorColor="red">
                    <!-- v-bind:class="{itemTaped: selectedItems.includes(item.id)}" -->
                    <v-template>
                        <StackLayout backgroundColor="#F0E68C"
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
                        <StackLayout backgroundColor="red" class="note-block-item"
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
                backColorItem: "gray",
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
    .titleLabel{
        text-align: center;
        font-weight: 700;
        font-size: 20px; 
    }
    .contentLabel{
        font-size: 20px; 
        font-weight:italic;
    }
    .note-block{
    border-style: solid; /* Белая рамка */
    border-color: #FFF;
    border-width: 10px;
    border-radius: 30px; /* Радиус скругления */
    }
    .note-block-item{
        Color: gray;
    }
</style>