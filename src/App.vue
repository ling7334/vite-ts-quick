<template>
	<div id="nav">
		<router-link to="/">{{ t('pages.home') }}</router-link> |
		<router-link to="/about">{{ t('pages.about') }}</router-link> |
		<router-link to="/example">{{ t('pages.example') }}</router-link>
		<form class="language">
			<label for="locale-select">language</label>
			<select id="locale-select" v-model="currentLocale">
			<option
				v-for="optionLocale in supportLocales"
				:key="optionLocale"
				:value="optionLocale"
			>
				{{ optionLocale }}
			</option>
			</select>
		</form>
	</div>
	<router-view />
	<div hidden>我知道你肯定会修改这里的^.^</div>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { SUPPORT_LOCALES, setI18nLanguage, loadLocaleMessages } from './locale'

export default defineComponent({
	name: 'App',
	setup() {
		const { t, locale } = useI18n({ useScope: 'global' })
		/**
		 * select locale value for language select form
		 *
		 * If you use the vue-i18n composer `locale` property directly, it will be re-rendering component when this property is changed,
		 * before dynamic import was used to asynchronously load and apply locale messages
		 * To avoid this, use the another locale reactive value.
		 */
		const currentLocale = ref(locale.value)
		watch(currentLocale, val => {
			loadLocaleMessages(val).then(() => setI18nLanguage(val))
		})
		
		return { t, locale, currentLocale, supportLocales: SUPPORT_LOCALES }
	}
})
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

#nav { padding: 30px; }
#nav a { font-weight: bold; color: #2c3e50; }
#nav a.router-link-exact-active { color: #42b983; }
.language label { margin-right: 1rem; }
</style>
