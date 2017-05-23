<template>
    <svg class="spinner" ref="spinner" :width="`${viewbox.width}px`" :height="`${viewbox.height}px`" :viewBox="`0 0 ${viewbox.width} ${viewbox.height}`" xmlns="http://www.w3.org/2000/svg">
       <circle ref="circle" fill="none" :style="`stroke-dashoffset:0; stroke-dasharray:${pathLength}`" :stroke-width="`${stroke}`" stroke-linecap="round" :cx="`${viewbox.width / 2}`" :cy="`${viewbox.height / 2}`" :r="`${size / 2}`"></circle>
    </svg>
</template>

<script>
    import { TimelineMax, TweenMax } from 'gsap'
    import _ from 'lodash'

    export default {
        name: 'Spinner',
        data() {
            return {
                anims: {
                    spinner: false,
                    stroke: false,
                    color: false,
                },
            }
        },
        props: {
            colors: {
                type: Array,
                default() {
                    return [
                        '#4285F4',
                        '#DE3E35',
                        '#F7C223',
                        '#1B9A59',
                        '#4285F4',
                    ]
                },
            },
            speed: {
                type: Number,
                default: 1.4,
            },
            stroke: {
                type: Number,
                default: 6,
            },
            size: {
                type: Number,
                default: 40,
            },
        },
        beforeDestroy() {
            if (this.anims.stroke) {
                this.anims.stroke.kill()
            }
            if (this.anims.color) {
                this.anims.color.kill()
            }
            if (this.anims.spinner) {
                this.anims.spinner.kill()
            }
        },
        mounted() {
            const speed = this.speed
            this.anims.spinner = TweenMax.to(this.$refs.spinner, speed, { transformOrigin: '50% 50%', rotation: 270, repeat: -1, ease: Power0.easeNone })
            const strokeAnim = new TimelineMax({ repeat: -1 })
            strokeAnim.from(this.$refs.circle, speed / 3, { strokeDashoffset: this.pathLength })
            strokeAnim.to(this.$refs.circle, speed / 3, { strokeDashoffset: this.pathLength / 4, transformOrigin: '50% 50%', rotation: 135 })
            strokeAnim.to(this.$refs.circle, speed / 3, { strokeDashoffset: this.pathLength, rotation: 450, transformOrigin: '50% 50%' })
            this.anims.stroke = strokeAnim
            this.anims.color = new TimelineMax({ repeat: -1 })
            _.each(this.colors, (color) => {
                this.anims.color.to(this.$refs.circle, speed, { stroke: color })
            })
        },
        computed: {
            viewbox() {
                return {
                    height: this.size + (this.stroke * 2),
                    width: this.size + (this.stroke * 2),
                }
            },
            pathLength() {
                const circumference = 2 * Math.PI * (this.size / 2)
                return circumference
            },
        },
        methods: {
        },
    }
</script>
