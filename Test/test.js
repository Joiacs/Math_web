numpy = {

    linspace (startValue, endValue, divisions) {
        let array = []
        let step = (endValue - startValue) / (divisions - 1)
        for (let i = 0; i < divisions; i++) {
            array.push(startValue + (i*step))
        }
        return array
    },

    zeros (numItems) {
        let array = []
        for (let i = 0; i < numItems; i++) {
            array.push(0)
        }
        return array
    }
}

integrate = {

    definite (f, a, b) {
        let area = 0
        let dx = 0.001
        for (let x = a; x < b; x += dx) {
            area += dx*f(x)
        }
        return area
    }
}

// setting up the grid
let t0 = 1
let y0 = 10
let tf = 10
let n = 100

let dt = (tf-t0)/n
    
let T = numpy.linspace(t0, tf, n+1)
    
// array to store the y-values
let y = numpy.zeros(n+1)
y[0] = y0

const renderBTN = document.querySelector("#render-btn")
const inputEl = document.querySelector("#input-el")
const inputBtn = document.querySelector("#button-addon2")
const inputEl1 = document.querySelector("#input-el-1")
const inputEl2 = document.querySelector("#input-el-2")
const inputTfinal = document.querySelector("#input-tFinal")
const inputEl3 = document.querySelector("#input-el-3")


inputBtn.addEventListener("click", function () {
    tf = parseInt(inputTfinal.value)
    inputTfinal.value = ""

    dt = (tf-t0)/n
    T = numpy.linspace(t0, tf, n+1)
})


renderBTN.addEventListener("click", function () {

    t0 = parseInt(inputEl1.value)
    y0 = parseInt(inputEl2.value)
    
    dt = parseFloat(inputEl3.value)
    T = numpy.linspace(t0, tf, n+1)

    y[0] = y0

    function localSlope(y, t) {
        let slope = eval(inputEl.value.replace(/x/g, "*").replace(/\^/g, "**"))
        return slope
        }

        for (let i = 0; i < n; i++) {
            y[i+1] = y[i] + localSlope(y[i], t0 + i*dt)*dt
            }

        let data = [{
            x: T,
            y: y,
            mode:"lines"
            }]

        let layout = {
            xaxis: {title: "Time(t)"},
            yaxis: {title: "y-axis"},
            title: "Solution to the IVP"
            };
                
        Plotly.newPlot("myPlot", data, layout)
})

// *note: could set up theoretical solution to compare