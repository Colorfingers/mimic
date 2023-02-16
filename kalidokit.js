/**
 * @kalidokit v1.1.5
 * Blendshape and kinematics calculator for Mediapipe/Tensorflow.js Face, Eyes, Pose, and Finger tracking models.
 * 
 * @license
 * Copyright (c) 2020-2021 yeemachine
 * SPDX-License-Idntifier: MIT 
 * https://github.com/yeemachine/kalidokit#readme
 */
 (function(g, x) {
	typeof exports == "object" && typeof module != "undefined" ? x(exports) : typeof define == "function" && define.amd ? define(["exports"], x) : (g = typeof globalThis != "undefined" ? globalThis : g || self, x(g.Kalidokit = {}))
})(this, function(g) {
	"use strict";
	const x = (e, t, n) => Math.max(Math.min(e, n), t),
		L = (e, t, n) => (x(e, t, n) - t) / (n - t),
		I = {
			Face: {
				eye: {
					l: 1,
					r: 1
				},
				mouth: {
					x: 0,
					y: 0,
					shape: {
						A: 0,
						E: 0,
						I: 0,
						O: 0,
						U: 0
					}
				},
				Head: {
					x: 0,
					y: 0,
					z: 0,
					width: .3,
					height: .6,
					position: {
						x: .5,
						y: .5,
						z: 0
					}
				},
				brow: 0,
				pupil: {
					x: 0,
					y: 0
				}
			},
			Pose: {
				RightArm: {
					x: 0,
					y: 0,
					z: 0
				},
				LeftArm: {
					x: 0,
					y: 0,
					z: 0
				},
				RightForeArm: {
					x: 0,
					y: 0,
					z: 0
				},
				LeftForeArm: {
					x: 0,
					y: 0,
					z: 0
				},
				LeftUpLeg: {
					x: 0,
					y: 0,
					z: 0
				},
				RightUpLeg: {
					x: 0,
					y: 0,
					z: 0
				},
				RightLeg: {
					x: 0,
					y: 0,
					z: 0
				},
				LeftLeg: {
					x: 0,
					y: 0,
					z: 0
				},
				LeftHand: {
					x: 0,
					y: 0,
					z: 0
				},
				RightHand: {
					x: 0,
					y: 0,
					z: 0
				},
				Spine: {
					x: 0,
					y: 0,
					z: 0
				},
				Hips: {
					position: {
						x: 0,
						y: 0,
						z: 0
					},
					rotation: {
						x: 0,
						y: 0,
						z: 0
					}
				}
			},
			RightHand: {
				RightWrist: {
					x: 0,
					y: 0,
					z: 0
				},
				RightHandRing1: {
					x: 0,
					y: 0,
					z: -.13
				},
				RightHandRing2: {
					x: 0,
					y: 0,
					z: -.4
				},
				RightHandRing3: {
					x: 0,
					y: 0,
					z: -.04
				},
				RightHandIndex1: {
					x: 0,
					y: 0,
					z: -.24
				},
				RightHandIndex2: {
					x: 0,
					y: 0,
					z: -.25
				},
				RightHandIndex3: {
					x: 0,
					y: 0,
					z: -.06
				},
				RightHandMiddle1: {
					x: 0,
					y: 0,
					z: -.09
				},
				RightHandMiddle2: {
					x: 0,
					y: 0,
					z: -.44
				},
				RightHandMiddle3: {
					x: 0,
					y: 0,
					z: -.06
				},
				RightHandThumb1: {
					x: -.23,
					y: -.33,
					z: -.12
				},
				RightHandThumb2: {
					x: -.2,
					y: -.199,
					z: -.0139
				},
				RightHandThumb3: {
					x: -.2,
					y: .002,
					z: .15
				},
				RightHandPinky1: {
					x: 0,
					y: 0,
					z: -.09
				},
				RightHandPinky2: {
					x: 0,
					y: 0,
					z: -.225
				},
				RightHandPinky3: {
					x: 0,
					y: 0,
					z: -.1
				}
			},
			LeftHand: {
				LeftWrist: {
					x: 0,
					y: 0,
					z: 0
				},
				LeftHandRing1: {
					x: 0,
					y: 0,
					z: .13
				},
				LeftHandRing2: {
					x: 0,
					y: 0,
					z: .4
				},
				LeftHandRing3: {
					x: 0,
					y: 0,
					z: .049
				},
				LeftHandIndex1: {
					x: 0,
					y: 0,
					z: .24
				},
				LeftHandIndex2: {
					x: 0,
					y: 0,
					z: .25
				},
				LeftHandIndex3: {
					x: 0,
					y: 0,
					z: .06
				},
				LeftHandMiddle1: {
					x: 0,
					y: 0,
					z: .09
				},
				LeftHandMiddle2: {
					x: 0,
					y: 0,
					z: .44
				},
				LeftHandMiddle3: {
					x: 0,
					y: 0,
					z: .066
				},
				LeftHandThumb1: {
					x: -.23,
					y: .33,
					z: .12
				},
				LeftHandThumb2: {
					x: -.2,
					y: .25,
					z: .05
				},
				LeftHandThumb3: {
					x: -.2,
					y: .17,
					z: -.06
				},
				LeftHandPinky1: {
					x: 0,
					y: 0,
					z: .17
				},
				LeftHandPinky2: {
					x: 0,
					y: 0,
					z: .4
				},
				LeftHandPinky3: {
					x: 0,
					y: 0,
					z: .1
				}
			}
		};
	var N = Object.freeze({
		__proto__: null,
		[Symbol.toStringTag]: "Module",
		clamp: x,
		remap: L,
		RestingDefault: I
	});
	const p = "Right",
		R = "Left",
		l = Math.PI,
		C = Math.PI * 2;
	class i {
		constructor(t, n, r) {
			var o, s, y, a, z, h;
			if (Array.isArray(t)) {
				this.x = (o = t[0]) != null ? o : 0, this.y = (s = t[1]) != null ? s : 0, this.z = (y = t[2]) != null ? y : 0;
				return
			}
			if (!!t && typeof t == "object") {
				this.x = (a = t.x) != null ? a : 0, this.y = (z = t.y) != null ? z : 0, this.z = (h = t.z) != null ? h : 0;
				return
			}
			this.x = t != null ? t : 0, this.y = n != null ? n : 0, this.z = r != null ? r : 0
		}
		negative() {
			return new i(-this.x, -this.y, -this.z)
		}
		add(t) {
			return t instanceof i ? new i(this.x + t.x, this.y + t.y, this.z + t.z) : new i(this.x + t, this.y + t, this.z + t)
		}
		subtract(t) {
			return t instanceof i ? new i(this.x - t.x, this.y - t.y, this.z - t.z) : new i(this.x - t, this.y - t, this.z - t)
		}
		multiply(t) {
			return t instanceof i ? new i(this.x * t.x, this.y * t.y, this.z * t.z) : new i(this.x * t, this.y * t, this.z * t)
		}
		divide(t) {
			return t instanceof i ? new i(this.x / t.x, this.y / t.y, this.z / t.z) : new i(this.x / t, this.y / t, this.z / t)
		}
		equals(t) {
			return this.x == t.x && this.y == t.y && this.z == t.z
		}
		dot(t) {
			return this.x * t.x + this.y * t.y + this.z * t.z
		}
		cross(t) {
			return new i(this.y * t.z - this.z * t.y, this.z * t.x - this.x * t.z, this.x * t.y - this.y * t.x)
		}
		length() {
			return Math.sqrt(this.dot(this))
		}
		distance(t, n = 3) {
			return Math.sqrt(n === 2 ? Math.pow(this.x - t.x, 2) + Math.pow(this.y - t.y, 2) : Math.pow(this.x - t.x, 2) + Math.pow(this.y - t.y, 2) + Math.pow(this.z - t.z, 2))
		}
		lerp(t, n) {
			return t.subtract(this).multiply(n).add(this)
		}
		unit() {
			return this.divide(this.length())
		}
		min() {
			return Math.min(Math.min(this.x, this.y), this.z)
		}
		max() {
			return Math.max(Math.max(this.x, this.y), this.z)
		}
		toSphericalCoords(t = {
			x: "x",
			y: "y",
			z: "z"
		}) {
			return {
				theta: Math.atan2(this[t.y], this[t.x]),
				phi: Math.acos(this[t.z] / this.length())
			}
		}
		angleTo(t) {
			return Math.acos(this.dot(t) / (this.length() * t.length()))
		}
		toArray(t) {
			return [this.x, this.y, this.z].slice(0, t || 3)
		}
		clone() {
			return new i(this.x, this.y, this.z)
		}
		init(t, n, r) {
			return this.x = t, this.y = n, this.z = r, this
		}
		static negative(t, n = new i) {
			return n.x = -t.x, n.y = -t.y, n.z = -t.z, n
		}
		static add(t, n, r = new i) {
			return n instanceof i ? (r.x = t.x + n.x, r.y = t.y + n.y, r.z = t.z + n.z) : (r.x = t.x + n, r.y = t.y + n, r.z = t.z + n), r
		}
		static subtract(t, n, r = new i) {
			return n instanceof i ? (r.x = t.x - n.x, r.y = t.y - n.y, r.z = t.z - n.z) : (r.x = t.x - n, r.y = t.y - n, r.z = t.z - n), r
		}
		static multiply(t, n, r = new i) {
			return n instanceof i ? (r.x = t.x * n.x, r.y = t.y * n.y, r.z = t.z * n.z) : (r.x = t.x * n, r.y = t.y * n, r.z = t.z * n), r
		}
		static divide(t, n, r = new i) {
			return n instanceof i ? (r.x = t.x / n.x, r.y = t.y / n.y, r.z = t.z / n.z) : (r.x = t.x / n, r.y = t.y / n, r.z = t.z / n), r
		}
		static cross(t, n, r = new i) {
			return r.x = t.y * n.z - t.z * n.y, r.y = t.z * n.x - t.x * n.z, r.z = t.x * n.y - t.y * n.x, r
		}
		static unit(t, n) {
			const r = t.length();
			return n.x = t.x / r, n.y = t.y / r, n.z = t.z / r, n
		}
		static fromAngles(t, n) {
			return new i(Math.cos(t) * Math.cos(n), Math.sin(n), Math.sin(t) * Math.cos(n))
		}
		static randomDirection() {
			return i.fromAngles(Math.random() * C, Math.asin(Math.random() * 2 - 1))
		}
		static min(t, n) {
			return new i(Math.min(t.x, n.x), Math.min(t.y, n.y), Math.min(t.z, n.z))
		}
		static max(t, n) {
			return new i(Math.max(t.x, n.x), Math.max(t.y, n.y), Math.max(t.z, n.z))
		}
		static lerp(t, n, r) {
			return n instanceof i ? n.subtract(t).multiply(r).add(t) : (n - t) * r + t
		}
		static fromArray(t) {
			return Array.isArray(t) ? new i(t[0], t[1], t[2]) : new i(t.x, t.y, t.z)
		}
		static angleBetween(t, n) {
			return t.angleTo(n)
		}
		static distance(t, n, r) {
			return Math.sqrt(r === 2 ? Math.pow(t.x - n.x, 2) + Math.pow(t.y - n.y, 2) : Math.pow(t.x - n.x, 2) + Math.pow(t.y - n.y, 2) + Math.pow(t.z - n.z, 2))
		}
		static toDegrees(t) {
			return t * (180 / l)
		}
		static normalizeAngle(t) {
			let n = t % C;
			return n = n > l ? n - C : n < -l ? C + n : n, n / l
		}
		static normalizeRadians(t) {
			return t >= l / 2 && (t -= C), t <= -l / 2 && (t += C, t = l - t), t / l
		}
		static find2DAngle(t, n, r, o) {
			const s = o - n,
				y = r - t;
			return Math.atan2(s, y)
		}
		static findRotation(t, n, r = !0) {
			return r ? new i(i.normalizeRadians(i.find2DAngle(t.z, t.x, n.z, n.x)), i.normalizeRadians(i.find2DAngle(t.z, t.y, n.z, n.y)), i.normalizeRadians(i.find2DAngle(t.x, t.y, n.x, n.y))) : new i(i.find2DAngle(t.z, t.x, n.z, n.x), i.find2DAngle(t.z, t.y, n.z, n.y), i.find2DAngle(t.x, t.y, n.x, n.y))
		}
		static rollPitchYaw(t, n, r) {
			if (!r) return new i(i.normalizeAngle(i.find2DAngle(t.z, t.y, n.z, n.y)), i.normalizeAngle(i.find2DAngle(t.z, t.x, n.z, n.x)), i.normalizeAngle(i.find2DAngle(t.x, t.y, n.x, n.y)));
			const o = n.subtract(t),
				s = r.subtract(t),
				a = o.cross(s).unit(),
				z = o.unit(),
				h = a.cross(z),
				c = Math.asin(a.x) || 0,
				u = Math.atan2(-a.y, a.z) || 0,
				f = Math.atan2(-h.x, z.x) || 0;
			return new i(i.normalizeAngle(u), i.normalizeAngle(c), i.normalizeAngle(f))
		}
		static angleBetween3DCoords(t, n, r) {
			t instanceof i || (t = new i(t), n = new i(n), r = new i(r));
			const o = t.subtract(n),
				s = r.subtract(n),
				y = o.unit(),
				a = s.unit(),
				z = y.dot(a),
				h = Math.acos(z);
			return i.normalizeRadians(h)
		}
		static getRelativeSphericalCoords(t, n, r, o) {
			t instanceof i || (t = new i(t), n = new i(n), r = new i(r));
			const s = n.subtract(t),
				y = r.subtract(n),
				a = s.unit(),
				z = y.unit(),
				{
					theta: h,
					phi: c
				} = a.toSphericalCoords(o),
				{
					theta: u,
					phi: f
				} = z.toSphericalCoords(o),
				M = h - u,
				A = c - f;
			return {
				theta: i.normalizeAngle(M),
				phi: i.normalizeAngle(A)
			}
		}
		static getSphericalCoords(t, n, r = {
			x: "x",
			y: "y",
			z: "z"
		}) {
			t instanceof i || (t = new i(t), n = new i(n));
			const s = n.subtract(t).unit(),
				{
					theta: y,
					phi: a
				} = s.toSphericalCoords(r);
			return {
				theta: i.normalizeAngle(-y),
				phi: i.normalizeAngle(l / 2 - a)
			}
		}
	}
	const T = e => {
			const t = {
				r: i.findRotation(e[11], e[13]),
				l: i.findRotation(e[12], e[14])
			};
			t.r.y = i.angleBetween3DCoords(e[12], e[11], e[13]), t.l.y = i.angleBetween3DCoords(e[11], e[12], e[14]);
			const n = {
				r: i.findRotation(e[13], e[15]),
				l: i.findRotation(e[14], e[16])
			};
			n.r.y = i.angleBetween3DCoords(e[11], e[13], e[15]), n.l.y = i.angleBetween3DCoords(e[12], e[14], e[16]), n.r.z = x(n.r.z, -2.14, 0), n.l.z = x(n.l.z, -2.14, 0);
			const r = {
					r: i.findRotation(i.fromArray(e[15]), i.lerp(i.fromArray(e[17]), i.fromArray(e[19]), .5)),
					l: i.findRotation(i.fromArray(e[16]), i.lerp(i.fromArray(e[18]), i.fromArray(e[20]), .5))
				},
				o = S(t.r, n.r, r.r, p),
				s = S(t.l, n.l, r.l, R);
			return {
				UpperArm: {
					r: o.UpperArm,
					l: s.UpperArm
				},
				LowerArm: {
					r: o.LowerArm,
					l: s.LowerArm
				},
				Hand: {
					r: o.Hand,
					l: s.Hand
				},
				Unscaled: {
					UpperArm: t,
					LowerArm: n,
					Hand: r
				}
			}
		},
		S = (e, t, n, r = p) => {
			const o = r === p ? 1 : -1;
			return e.z *= -2.3 * o, e.y *= l * o, e.y -= Math.max(t.x), e.y -= -o * Math.max(t.z, 0), e.x -= .3 * o, t.z *= -2.14 * o, t.y *= 2.14 * o, t.x *= 2.14 * o, e.x = x(e.x, -.5, l), t.x = x(t.x, -.3, .3), n.y = x(n.z * 2, -.6, .6), n.z = n.z * -2.3 * o, {
				UpperArm: e,
				LowerArm: t,
				Hand: n
			}
		},
		O = (e, t) => {
			const n = i.fromArray(t[23]),
				r = i.fromArray(t[24]),
				o = i.fromArray(t[11]),
				s = i.fromArray(t[12]),
				y = n.lerp(r, 1),
				a = o.lerp(s, 1),
				z = y.distance(a),
				h = {
					position: {
						x: x(y.x - .4, -1, 1),
						y: 0,
						z: x(z - 1, -2, 0)
					}
				};
			h.worldPosition = {
				x: h.position.x,
				y: 0,
				z: h.position.z * Math.pow(h.position.z * -2, 2)
			}, h.worldPosition.x *= h.worldPosition.z, h.rotation = i.rollPitchYaw(e[23], e[24]), h.rotation.y > .5 && (h.rotation.y -= 2), h.rotation.y += .5, h.rotation.z > 0 && (h.rotation.z = 1 - h.rotation.z), h.rotation.z < 0 && (h.rotation.z = -1 - h.rotation.z);
			const c = L(Math.abs(h.rotation.y), .2, .4);
			h.rotation.z *= 1 - c, h.rotation.x = 0;
			const u = i.rollPitchYaw(e[11], e[12]);
			u.y > .5 && (u.y -= 2), u.y += .5, u.z > 0 && (u.z = 1 - u.z), u.z < 0 && (u.z = -1 - u.z);
			const f = L(Math.abs(u.y), .2, .4);
			return u.z *= 1 - f, u.x = 0, K(h, u)
		},
		K = (e, t) => (e.rotation && (e.rotation.x *= Math.PI, e.rotation.y *= Math.PI, e.rotation.z *= Math.PI), t.x *= l, t.y *= l, t.z *= l, {
			Hips: e,
			Spine: t
		});
	class m {
		constructor(t, n, r, o) {
			var s, y, a, z;
			if (!!t && typeof t == "object") {
				this.x = (s = t.x) != null ? s : 0, this.y = (y = t.y) != null ? y : 0, this.z = (a = t.z) != null ? a : 0, this.rotationOrder = (z = t.rotationOrder) != null ? z : "XYZ";
				return
			}
			this.x = t != null ? t : 0, this.y = n != null ? n : 0, this.z = r != null ? r : 0, this.rotationOrder = o != null ? o : "XYZ"
		}
		multiply(t) {
			return new m(this.x * t, this.y * t, this.z * t, this.rotationOrder)
		}
	}
	const G = {
			upperLeg: {
				z: .1
			}
		},
		E = e => {
			const t = i.getSphericalCoords(e[23], e[25], {
					x: "x", //"y",
					y: "y", //"z",
					z: "z" //"x"
				}),
				n = i.getSphericalCoords(e[24], e[26], {
					x: "x", //"y",
					y: "y", //"z",
					z: "z" //"x"
				}),
				r = i.getRelativeSphericalCoords(e[23], e[25], e[27], {
					x: "x", //"y",
					y: "y", //"z",
					z: "z" //"x"
				}),
				o = i.getRelativeSphericalCoords(e[24], e[26], e[28], {
					x: "x", //"y",
					y: "y", //"z",
					z: "z" //"x"
				}),
				s = i.findRotation(e[23], e[24]),
				y = {
					r: new i({
						x: t.theta,
						y: r.phi,
						z: t.phi - s.z
					}),
					l: new i({
						x: n.theta,
						y: o.phi,
						z: n.phi - s.z
					})
				},
				a = {
					r: new i({
						x: -Math.abs(r.theta),
						y: 0,
						z: 0
					}),
					l: new i({
						x: -Math.abs(o.theta),
						y: 0,
						z: 0
					})
				},
				z = W(y.r, a.r, p),
				h = W(y.l, a.l, R);
			return {
				UpperLeg: {
					r: z.UpperLeg,
					l: h.UpperLeg
				},
				LowerLeg: {
					r: z.LowerLeg,
					l: h.LowerLeg
				},
				Unscaled: {
					UpperLeg: y,
					LowerLeg: a
				}
			}
		},
		W = (e, t, n = p) => {
			const r = n === p ? 1 : -1,
				o = new m({
					x: x(e.x, 0, .5) * l,
					y: x(e.y, -.25, .25) * l,
					z: x(e.z, -.5, .5) * l + r * G.upperLeg.z,
					rotationOrder: "XYZ"
				}),
				s = new m({
					x: t.x * l,
					y: t.y * l,
					z: t.z * l
				});
			return {
				UpperLeg: o,
				LowerLeg: s
			}
		};
	class U {
		static solve(t, n, {
			runtime: r = "mediapipe",
			video: o = null,
			imageSize: s = null,
			enableLegs: y = !0
		} = {}) {
			var A, B, P, D;
			if (!t && !n) {
				console.error("Need both World Pose and Pose Landmarks");
				return
			}
			if (o) {
				const w = typeof o == "string" ? document.querySelector(o) : o;
				s = {
					width: w.videoWidth,
					height: w.videoHeight
				}
			}
			if (r === "tfjs" && s) {
				for (const w of t) w.visibility = w.score;
				for (const w of n) w.x /= s.width, w.y /= s.height, w.z = 0, w.visibility = w.score
			}
			const a = T(t),
				z = O(t, n),
				h = y ? E(t) : null,
				c = t[15].y > .1 || ((A = t[15].visibility) != null ? A : 0) < .23 || .995 < n[15].y,
				u = t[16].y > .1 || ((B = t[16].visibility) != null ? B : 0) < .23 || .995 < n[16].y,
				f = t[23].y > .1 || ((P = t[23].visibility) != null ? P : 0) < .63 || z.Hips.position.z > -.4,
				M = t[24].y > .1 || ((D = t[24].visibility) != null ? D : 0) < .63 || z.Hips.position.z > -.4;
			return a.UpperArm.l = a.UpperArm.l.multiply(u ? 0 : 1), a.UpperArm.l.z = u ? I.Pose.LeftArm.z : a.UpperArm.l.z, a.UpperArm.r = a.UpperArm.r.multiply(c ? 0 : 1), a.UpperArm.r.z = c ? I.Pose.RightArm.z : a.UpperArm.r.z, a.LowerArm.l = a.LowerArm.l.multiply(u ? 0 : 1), a.LowerArm.r = a.LowerArm.r.multiply(c ? 0 : 1), a.Hand.l = a.Hand.l.multiply(u ? 0 : 1), a.Hand.r = a.Hand.r.multiply(c ? 0 : 1), h && (h.UpperLeg.l = h.UpperLeg.l.multiply(M ? 0 : 1), h.UpperLeg.r = h.UpperLeg.r.multiply(f ? 0 : 1), h.LowerLeg.l = h.LowerLeg.l.multiply(M ? 0 : 1), h.LowerLeg.r = h.LowerLeg.r.multiply(f ? 0 : 1)), {
				RightArm: a.UpperArm.r,
				RightForeArm: a.LowerArm.r,
				LeftArm: a.UpperArm.l,
				LeftForeArm: a.LowerArm.l,
				RightHand: a.Hand.r,
				LeftHand: a.Hand.l,
				RightUpLeg: h ? h.UpperLeg.r : I.Pose.RightUpLeg,
				RightLeg: h ? h.LowerLeg.r : I.Pose.RightLeg,
				LeftUpLeg: h ? h.UpperLeg.l : I.Pose.LeftUpLeg,
				LeftLeg: h ? h.LowerLeg.l : I.Pose.LeftLeg,
				Hips: z.Hips,
				Spine: z.Spine
			}
		}
	}
	U.calcArms = T, U.calcHips = O, U.calcLegs = E;
	class J {
		static solve(t, n = p) {
			if (!t) {
				console.error("Need Hand Landmarks");
				return
			}
			const r = [new i(t[0]), new i(t[n === p ? 17 : 5]), new i(t[n === p ? 5 : 17])],
				o = i.rollPitchYaw(r[0], r[1], r[2]);
			o.y = o.z, o.y -= .4;
			let s = {};
			return s[n + "Wrist"] = {
				x: o.x,
				y: o.y,
				z: o.z
			}, s[n + "RingProximal"] = {
				x: 0,
				y: 0,
				z: i.angleBetween3DCoords(t[0], t[13], t[14])
			}, s[n + "RingIntermediate"] = {
				x: 0,
				y: 0,
				z: i.angleBetween3DCoords(t[13], t[14], t[15])
			}, s[n + "RingDistal"] = {
				x: 0,
				y: 0,
				z: i.angleBetween3DCoords(t[14], t[15], t[16])
			}, s[n + "IndexProximal"] = {
				x: 0,
				y: 0,
				z: i.angleBetween3DCoords(t[0], t[5], t[6])
			}, s[n + "IndexIntermediate"] = {
				x: 0,
				y: 0,
				z: i.angleBetween3DCoords(t[5], t[6], t[7])
			}, s[n + "IndexDistal"] = {
				x: 0,
				y: 0,
				z: i.angleBetween3DCoords(t[6], t[7], t[8])
			}, s[n + "MiddleProximal"] = {
				x: 0,
				y: 0,
				z: i.angleBetween3DCoords(t[0], t[9], t[10])
			}, s[n + "MiddleIntermediate"] = {
				x: 0,
				y: 0,
				z: i.angleBetween3DCoords(t[9], t[10], t[11])
			}, s[n + "MiddleDistal"] = {
				x: 0,
				y: 0,
				z: i.angleBetween3DCoords(t[10], t[11], t[12])
			}, s[n + "ThumbProximal"] = {
				x: 0,
				y: 0,
				z: i.angleBetween3DCoords(t[0], t[1], t[2])
			}, s[n + "ThumbIntermediate"] = {
				x: 0,
				y: 0,
				z: i.angleBetween3DCoords(t[1], t[2], t[3])
			}, s[n + "ThumbDistal"] = {
				x: 0,
				y: 0,
				z: i.angleBetween3DCoords(t[2], t[3], t[4])
			}, s[n + "LittleProximal"] = {
				x: 0,
				y: 0,
				z: i.angleBetween3DCoords(t[0], t[17], t[18])
			}, s[n + "LittleIntermediate"] = {
				x: 0,
				y: 0,
				z: i.angleBetween3DCoords(t[17], t[18], t[19])
			}, s[n + "LittleDistal"] = {
				x: 0,
				y: 0,
				z: i.angleBetween3DCoords(t[18], t[19], t[20])
			}, s = Q(s, n), s
		}
	}
	const Q = (e, t = p) => {
			const n = t === p ? 1 : -1,
				r = ["Ring", "Index", "Little", "Thumb", "Middle"],
				o = ["Proximal", "Intermediate", "Distal"];
			return e[t + "Wrist"].x = x(e[t + "Wrist"].x * 2 * n, -.3, .3), e[t + "Wrist"].y = x(e[t + "Wrist"].y * 2.3, t === p ? -1.2 : -.6, t === p ? .6 : 1.6), e[t + "Wrist"].z = e[t + "Wrist"].z * -2.3 * n, r.forEach(s => {
				o.forEach(y => {
					const a = e[t + s + y];
					if (s === "Thumb") {
						const z = {
								x: y === "Proximal" ? 2.2 : 0,
								y: y === "Proximal" ? 2.2 : y === "Intermediate" ? .7 : 1,
								z: .5
							},
							h = {
								x: y === "Proximal" ? 1.2 : -.2,
								y: y === "Proximal" ? 1.1 * n : .1 * n,
								z: .2 * n
							},
							c = {
								x: 0,
								y: 0,
								z: 0
							};
						y === "Proximal" ? (c.z = x(h.z + a.z * -l * z.z * n, t === p ? -.6 : -.3, t === p ? .3 : .6), c.x = x(h.x + a.z * -l * z.x, -.6, .3), c.y = x(h.y + a.z * -l * z.y * n, t === p ? -1 : -.3, t === p ? .3 : 1)) : (c.z = x(h.z + a.z * -l * z.z * n, -2, 2), c.x = x(h.x + a.z * -l * z.x, -2, 2), c.y = x(h.y + a.z * -l * z.y * n, -2, 2)), a.x = c.x, a.y = c.y, a.z = c.z
					} else a.z = x(a.z * -l * n, t === p ? -l : 0, t === p ? 0 : l)
				})
			}), e
		},
		$ = e => {
			const t = new i(e[21]),
				n = new i(e[251]),
				r = new i(e[397]),
				o = new i(e[172]),
				s = r.lerp(o, .5);
			return {
				vector: [t, n, s],
				points: [t, n, r, o]
			}
		},
		j = e => {
			const t = $(e).vector,
				n = i.rollPitchYaw(t[0], t[1], t[2]),
				r = t[0].lerp(t[1], .5),
				o = t[0].distance(t[1]),
				s = r.distance(t[2]);
			return n.x *= -1, n.z *= -1, {
				y: n.y * l,
				x: n.x * l,
				z: n.z * l,
				width: o,
				height: s,
				position: r.lerp(t[2], .5),
				normalized: {
					y: n.y,
					x: n.x,
					z: n.z
				},
				degrees: {
					y: n.y * 180,
					x: n.x * 180,
					z: n.z * 180
				}
			}
		},
		H = {
			eye: {
				[R]: [130, 133, 160, 159, 158, 144, 145, 153],
				[p]: [263, 362, 387, 386, 385, 373, 374, 380]
			},
			brow: {
				[R]: [35, 244, 63, 105, 66, 229, 230, 231],
				[p]: [265, 464, 293, 334, 296, 449, 450, 451]
			},
			pupil: {
				[R]: [468, 469, 470, 471, 472],
				[p]: [473, 474, 475, 476, 477]
			}
		},
		F = (e, t = R, {
			high: n = .85,
			low: r = .55
		} = {}) => {
			const o = H.eye[t],
				s = Y(e[o[0]], e[o[1]], e[o[2]], e[o[3]], e[o[4]], e[o[5]], e[o[6]], e[o[7]]),
				a = x(s / .285, 0, 2);
			return {
				norm: L(a, r, n),
				raw: a
			}
		},
		Y = (e, t, n, r, o, s, y, a) => {
			e = new i(e), t = new i(t), n = new i(n), r = new i(r), o = new i(o), s = new i(s), y = new i(y), a = new i(a);
			const z = e.distance(t, 2),
				h = n.distance(s, 2),
				c = r.distance(y, 2),
				u = o.distance(a, 2);
			return (h + c + u) / 3 / z
		},
		q = (e, t = R) => {
			const n = new i(e[H.eye[t][0]]),
				r = new i(e[H.eye[t][1]]),
				o = n.distance(r, 2),
				s = n.lerp(r, .5),
				y = new i(e[H.pupil[t][0]]),
				a = s.x - y.x,
				z = s.y - o * .075 - y.y;
			let h = a / (o / 2),
				c = z / (o / 4);
			return h *= 4, c *= 4, {
				x: h,
				y: c
			}
		},
		X = (e, t, {
			enableWink: n = !0,
			maxRot: r = .5
		} = {}) => {
			e.r = x(e.r, 0, 1), e.l = x(e.l, 0, 1);
			const o = Math.abs(e.l - e.r),
				s = n ? .8 : 1.2,
				y = e.l < .3 && e.r < .3,
				a = e.l > .6 && e.r > .6;
			return t > r ? {
				l: e.r,
				r: e.r
			} : t < -r ? {
				l: e.l,
				r: e.l
			} : {
				l: o >= s && !y && !a ? e.l : e.r > e.l ? i.lerp(e.r, e.l, .95) : i.lerp(e.r, e.l, .05),
				r: o >= s && !y && !a ? e.r : e.r > e.l ? i.lerp(e.r, e.l, .95) : i.lerp(e.r, e.l, .05)
			}
		},
		b = (e, {
			high: t = .85,
			low: n = .55
		} = {}) => {
			if (e.length !== 478) return {
				l: 1,
				r: 1
			};
			const r = F(e, R, {
					high: t,
					low: n
				}),
				o = F(e, p, {
					high: t,
					low: n
				});
			return {
				l: r.norm || 0,
				r: o.norm || 0
			}
		},
		_ = e => {
			if (e.length !== 478) return {
				x: 0,
				y: 0
			}; {
				const t = q(e, R),
					n = q(e, p);
				return {
					x: (t.x + n.x) * .5 || 0,
					y: (t.y + n.y) * .5 || 0
				}
			}
		},
		k = (e, t = R) => {
			const n = H.brow[t],
				r = Y(e[n[0]], e[n[1]], e[n[2]], e[n[3]], e[n[4]], e[n[5]], e[n[6]], e[n[7]]),
				o = 1.15,
				s = .125,
				y = .07,
				a = r / o - 1;
			return (x(a, y, s) - y) / (s - y)
		},
		V = e => {
			if (e.length !== 478) return 0; {
				const t = k(e, R),
					n = k(e, p);
				return (t + n) / 2 || 0
			}
		},
		tt = e => {
			const t = new i(e[133]),
				n = new i(e[362]),
				r = new i(e[130]),
				o = new i(e[263]),
				s = t.distance(n),
				y = r.distance(o),
				a = new i(e[13]),
				z = new i(e[14]),
				h = new i(e[61]),
				c = new i(e[291]),
				u = a.distance(z),
				f = h.distance(c);
			let M = u / s,
				A = f / y;
			M = L(M, .15, .7), A = L(A, .45, .9), A = (A - .3) * 2;
			const B = A,
				P = L(u / s, .17, .5),
				D = x(L(B, 0, 1) * 2 * L(P, .2, .7), 0, 1),
				w = P * .4 + P * (1 - D) * .6,
				v = P * L(1 - D, 0, .3) * .1,
				nt = L(v, .2, 1) * (1 - D) * .3,
				et = (1 - D) * L(P, .3, 1) * .4;
			return {
				x: A || 0,
				y: M || 0,
				shape: {
					A: w || 0,
					E: nt || 0,
					I: D || 0,
					O: et || 0,
					U: v || 0
				}
			}
		};
	class Z {
		static solve(t, {
			runtime: n = "tfjs",
			video: r = null,
			imageSize: o = null,
			smoothBlink: s = !1,
			blinkSettings: y = []
		} = {}) {
			if (!t) {
				console.error("Need Face Landmarks");
				return
			}
			if (r) {
				const f = typeof r == "string" ? document.querySelector(r) : r;
				o = {
					width: f.videoWidth,
					height: f.videoHeight
				}
			}
			if (n === "mediapipe" && o)
				for (const f of t) f.x *= o.width, f.y *= o.height, f.z *= o.width;
			const a = j(t),
				z = tt(t);
			y = y.length > 0 ? y : n === "tfjs" ? [.55, .85] : [.35, .5];
			let h = b(t, {
				high: y[1],
				low: y[0]
			});
			s && (h = X(h, a.y));
			const c = _(t),
				u = V(t);
			return {
				Head: a,
				eye: h,
				brow: u,
				pupil: c,
				mouth: z
			}
		}
	}
	Z.stabilizeBlink = X;
	const d = null;
	g.AxisMap = d, g.EulerRotation = d, g.Face = Z, g.Hand = J, g.HandKeys = d, g.IFaceSolveOptions = d, g.IHips = d, g.IPoseSolveOptions = d, g.ISolveOptions = d, g.LR = d, g.Pose = U, g.Results = d, g.RotationOrder = d, g.Side = d, g.TFVectorPose = d, g.TFace = d, g.THand = d, g.THandUnsafe = d, g.TPose = d, g.Utils = N, g.Vector = i, g.XYZ = d, Object.defineProperty(g, "__esModule", {
		value: !0
	}), g[Symbol.toStringTag] = "Module"
});