"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// test-supabase-login.ts
// Script Node.js pour tester le login Supabase en ligne de commande
var supabase_js_1 = require("@supabase/supabase-js");
var supabaseUrl = 'https://hkcpvwbfeybfbdwyjkgd.supabase.co';
var supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrY3B2d2JmZXliZmJkd3lqa2dkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwOTY4MDIsImV4cCI6MjA2MDY3MjgwMn0.sXGyE9E8gbQ2x_ztfxbhLe51we-IbgRyaQJ1YJPJ79c';
var supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseAnonKey);
function testLogin(email, password) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, data, error;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, supabase.auth.signInWithPassword({ email: email, password: password })];
                case 1:
                    _a = _b.sent(), data = _a.data, error = _a.error;
                    if (error) {
                        console.error('Erreur de connexion:', error.message);
                        process.exit(1);
                    }
                    if (data === null || data === void 0 ? void 0 : data.user) {
                        console.log('Connexion réussie! Utilisateur:', data.user);
                        process.exit(0);
                    }
                    else {
                        console.error('Aucun utilisateur retourné. Data:', data);
                        process.exit(2);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
// Utilisation: node test-supabase-login.js email@example.com motdepasse
var _a = process.argv, email = _a[2], password = _a[3];
if (!email || !password) {
    console.error('Usage: node test-supabase-login.js <email> <password>');
    process.exit(1);
}
testLogin(email, password);
