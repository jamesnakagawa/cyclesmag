export class VectorControl {
    bias = {x: 0, y: 0, z: 0};

    constructor(x_scale = 1, y_scale = 1, z_scale = 1, smoothing = 5) {
        this.current_set = [];
        this.x_scale = x_scale;
        this.y_scale = y_scale;
        this.z_scale = z_scale;
        this.smoothing = smoothing;
        for (let i = 0; i < this.smoothing; i++) {
            this.current_set.push(this.rand_vec());
        }
    }

    rand_vec() {
        // Generates a random 3D unit vector (direction) with a uniform spherical distribution
        // Algo from http://stackoverflow.com/questions/5408276/python-uniform-spherical-distribution
        let phi = Math.random() * 2 * Math.PI;
        let costheta = Math.random() * 2 - 1;
        let theta = Math.acos(costheta)
        const x = Math.sin(theta) * Math.cos(phi);
        const y = Math.sin(theta) * Math.sin(phi);
        const z = Math.cos(theta)
        return {x, y, z};
    }

    static addFn(acc, {x, y, z}) {
        acc.x += x;
        acc.y += y;
        acc.z += z;
        return acc;
    }

    cur() {
        let pt = this.current_set.reduce(this.constructor.addFn, {...this.bias});
        pt.x *= this.x_scale / this.smoothing;
        pt.y *= this.y_scale / this.smoothing;
        pt.z *= this.z_scale / this.smoothing;
        return pt;
    }

    next() {
        this.current_set.shift();
        this.current_set.push(this.rand_vec());
        return this.cur();
    }

    setBias(x, y, z) {
        if (typeof x === 'number') {
            this.bias.x = x;
        }
        if (typeof y === 'number') {
            this.bias.y = y;
        }
        if (typeof z === 'number') {
            this.bias.z = z;
        }
    }
}