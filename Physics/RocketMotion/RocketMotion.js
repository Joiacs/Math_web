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

const xiInput = document.querySelector("#xi-input")
const viInput = document.querySelector("#vi-input")
const vrelInput = document.querySelector("#vrel-input")
const rInput = document.querySelector("#r-input")
const miInput = document.querySelector("#mi-input")
const mfInput = document.querySelector("#mf-input")

const calculateBtn = document.querySelector("#calculate-btn")

calculateBtn.addEventListener("click", function () {
    // initial variables
    let xi =  parseInt(xiInput.value)
    let vi = parseInt(viInput.value)
    let vrel = parseInt(vrelInput.value)
    let R = parseInt(rInput.value)
    let mi = parseInt(miInput.value)
    let mf = parseInt(mfInput.value)
    let N = 10000

    // flight time, dt, dm
    let T = -(mf-mi) / R
    let dt = T / N
    let dm = -R*dt

    let time = numpy.linspace(0, T, N + 1)

    // initializing arrays
    let m = numpy.zeros(N+1) // mass
    let v = numpy.zeros(N+1) // velocity
    let x = numpy.zeros(N+1) // position

    m[0] = mi
    v[0] = vi
    x[0] = xi

    for (let i = 0; i < N; ++i) {
        m[i+1]=m[i]-R*dt
        v[i+1]=v[i]-vrel*dm/m[i]
        x[i+1]=x[i]+v[i]*dt
    }

    let positionData = [{
        x: time,
        y: x,
        mode: "lines",
        type: "scatter",
    }]

    let positionLayout = {
        xaxis: {title: "Time(s)"},
        yaxis: {title: "Position(m)"},
        title: "Position vs Time"
    }

    let velocityData = [{
        x: time,
        y: v,
        mode: "lines",
        type: "scatter",
        line: {
            color: "rgb(12, 201, 93)"
        }
    }]

    let velocityLayout = {
        xaxis: {title: "Time(s)"},
        yaxis: {title: "Velocity(m/s)"},
        title: "Velocity vs Time"
    }

    let massData = [{
        x: time,
        y: m,
        mode: "lines",
        type: "scatter",
        line: {
            color: "rgb(219, 64, 82)"
        }
    }]

    let massLayout = {
        xaxis: {title: "Time(s)"},
        yaxis: {title: "Mass(kg)"},
        title: "Mass vs Time"
    }

    Plotly.newPlot("position-time", positionData, positionLayout)
    Plotly.newPlot("velocity-time", velocityData, velocityLayout)
    Plotly.newPlot("mass-time", massData, massLayout)
})



