new Vue({
    el: '#app',
    data: {
        player_x: 50,
        player_y: 50,
        walk: null,
        intervalid1: '',
        score: 0,
        count: 0,
        dot_x: 0,
        dot_y: 0,
        dot: false,
        snake: [{player_x: 50, player_y: 50, prev_x: 0, prev_y: 0, color: 'blue'}],
        isLose: null,
        input: ""
    },
    methods: {
        right: function () {
            if (this.walk != 'left'){
                this.walk = 'right'
            }
        },
        up: function () {
            if (this.walk != 'down'){
                this.walk = 'up'
            }
        },
        left: function () {
            if (this.walk != 'right'){
                this.walk = 'left'
            }
        },
        down: function () {
            if (this.walk != 'up'){
                this.walk = 'down'
            }
        },
        moveDot: function () {
            this.walk = ['right', 'left', 'up', 'down'][Math.floor(0 + Math.random() * 4)]
            this.score = 0
            if (this.intervalid1){
                clearInterval(this.intervalid1)
                
            }
            this.isLose = false
            this.snake = [{player_x: 50, player_y: 50, prev_x: 0, prev_y: 0, color: 'blue'}]
            // console.log(this.snake[0])
            this.dot_x = (Math.floor(Math.random() * (95 - 5 + 1)) + 5);
            this.dot_y = (Math.floor(Math.random() * (95 - 5 + 1)) + 5);
            // console.log(this.dot_x % 5  + " " + this.dot_y % 5)
            let error = 0
            while (this.dot_x % 5 != 0 || this.dot_y % 5 != 0 || error > 0) {
                error = 0
                for (let i = 0; i < this.snake.lenght; i++){
                    if (this.dot_x == this.snake[i]['player_x'] & this.snake[i]['player_y'] == this.dot_y){
                        error++;
                    }
                }
                this.dot_x = (Math.floor(Math.random() * (95 - 5 + 1)) + 5);
                this.dot_y = (Math.floor(Math.random() * (95 - 5 + 1)) + 5);
                // console.log(this.dot_x + " " + this.dot_y)
            }
            this.dot = true
            // console.log(this.snake)
            this.intervalid1 = setInterval(() => {
                this.snake[0]['prev_x'] = this.snake[0]['player_x']
                this.snake[0]['prev_y'] = this.snake[0]['player_y']
                if (this.walk == 'right') {
                    this.snake[0]['player_x'] += 5
                }
                if (this.walk == 'up') {
                    this.snake[0]['player_y'] -= 5
                }
                if (this.walk == 'left') {
                    this.snake[0]['player_x'] -= 5
                }
                if (this.walk == 'down') {
                    this.snake[0]['player_y'] += 5
                }
                if (this.snake[0]['player_x'] > 95) {
                    this.snake[0]['player_x'] = 5
                }
                if (this.snake[0]['player_y'] > 95) {
                    this.snake[0]['player_y'] = 5
                }
                if (this.snake[0]['player_x'] < 5) {
                    this.snake[0]['player_x'] = 95
                }
                if (this.snake[0]['player_y'] < 5) {
                    this.snake[0]['player_y'] = 95
                }
                let count = 0
                for (let i = 1; i < this.snake.length; i++){
                    if (this.snake[0]['player_y'] == this.snake[i]['player_y'] && this.snake[0]['player_x'] == this.snake[i]['player_x']){
                        count++
                    }
                }
                if (count > 0){
                    clearInterval(this.intervalid1)
                    this.isLose = true
                }
                if (this.dot_x == this.snake[0]['player_x'] && this.dot_y == this.snake[0]['player_y']) {
                    this.snake.push({
                        player_x: this.dot_x,
                        player_y: this.dot_y,
                        prev_x: 0,
                        prev_y: 0,
                        color: 'black'
                    })
                    this.score += 10
                    this.dot = false
                    this.dot_x = (Math.floor(Math.random() * (95 - 5 + 1)) + 5);
                    this.dot_y = (Math.floor(Math.random() * (95 - 5 + 1)) + 5);
                    // console.log(this.dot_x % 5  + " " + this.dot_y % 5)
                    while (this.dot_x % 5 != 0 || this.dot_y % 5 != 0) {
                        this.dot_x = (Math.floor(Math.random() * (95 - 5 + 1)) + 5);
                        this.dot_y = (Math.floor(Math.random() * (95 - 5 + 1)) + 5);
                        // console.log(this.dot_x + " " + this.dot_y)
                    }
                    this.dot = true;
                    // console.log(this.player_x + " " + this.player_y)
                }
                for (let i = 0; i < this.snake.length; i++){
                    if (i != 0) {
                        this.snake[i]['prev_x'] = this.snake[i]['player_x']
                        this.snake[i]['prev_y'] = this.snake[i]['player_y']

                        this.snake[i]['player_x'] = this.snake[i-1]['prev_x']
                        this.snake[i]['player_y'] = this.snake[i-1]['prev_y']

                    }
                }
                // console.log(this.snake.length)
            }, 75);
            // console.log('1')
        }

    }
})