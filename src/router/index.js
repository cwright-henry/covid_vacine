import Vue from 'vue'
import VueRouter from 'vue-router'
import VacineList from '@/views/vacines/VacineList'


Vue.use(VueRouter)

const routes = [
	{
		path: '',
		redirect: '/vaccines',
	},
	{
		path: '/vaccines',
		name: 'vacinelist',
		component: VacineList,
		meta: {
			yPos: 0
		}
	},
	{
		path: '*',
		redirect: '/'
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,

	/**
	 * Browser based navigation - does not take care of
	 * programmatic navigation
	 */
	scrollBehavior(to, from, savedPosition) {
		let position = { x: 0, y: 0 };
		if (savedPosition) {
			position = savedPosition
		}

		if (to.name === 'vacinelist') {
			position = { x: 0, y: to.meta.yPos }
		}
		else {
			return position;
		}

		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(position)
			}, 400)
		})
	},

	routes
})

router.afterEach((to) => {
	window.gtag('config', window.GA_TRACKING_ID, {
		page_path: to.fullPath,
		page_title: to.name
	});
});

export default router
