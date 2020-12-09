<template>
    <Page actionBarHidden="true">
        <GridLayout columns="*,*" rows="*,50,50,50,*"
            backgroundColor="#3c495e">
            <TextField row="1" col="0" colSpan="2" v-model="login"
                hint="Имя пользователя" maxLength="20"
                @textChange="changeMessage" />
            <TextField row="2" col="0" colSpan="2" v-model="password"
                hint="Пароль" secure="true" maxLength="12"
                @textChange="changeMessage" />
            <Button row="3" col="0" text="Войти" @tap="auth" />
            <Button row="3" col="1" text="Зарегестрироваться" @tap="signin" />
            <TextView row="4" col="0" editable="false" v-model="message" />
        </GridLayout>
    </Page>
</template>

<script>
    import Vue from "nativescript-vue";
    import MainLayout from "./MainLayout";
    import {
        Users
    } from "../scripts/users";

    export default {
        created() {},
        methods: {
            changeMessage(){
                this.message = "";
            },
            signin() {
                if (this.login && this.password) {
                    const userId = this.usersObject.auth(this.login, this
                        .password);
                    if (userId) {
                        this.message =
                            "Пользователь с таким логином уже существует";
                    } else {
                        this.$navigateTo(MainLayout, {
                            props: {
                                userId: this.usersObject.createUser(
                                    this.login,
                                    this.password
                                )
                            }
                        });
                    }
                }
            },
            auth() {
                if (this.login && this.password) {
                    const userId = this.usersObject.auth(this.login, this
                        .password);
                    if (userId) {
                        this.$navigateTo(MainLayout, {
                            props: {
                                userId
                            }
                        });
                    } else {
                        this.message = "Неверный логин или пароль";
                    }
                }
            }
        },
        data() {
            return {
                login: "",
                password: "",
                message: "",
                usersObject: new Users()
            };
        }
    };
</script>

<style>
</style>