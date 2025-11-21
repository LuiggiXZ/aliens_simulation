import React, { useState, useEffect, useRef } from 'react';
import { Trophy, Users, DollarSign, Calendar, Activity, TrendingUp, Shield, AlertTriangle, PlayCircle, PauseCircle, ChevronRight, Award } from 'lucide-react';

// --- ASSETS & DATA ---
// Mapeando as imagens enviadas para os times
const TEAM_ASSETS = {
  'ESC HX': { img: 'image_74e0e1.png', color: 'bg-emerald-600', text: 'text-emerald-100', border: 'border-emerald-500' },
  'Schalke 69': { img: 'image_74e0e8.png', color: 'bg-blue-700', text: 'text-blue-100', border: 'border-blue-500' },
  'Los Amostradinhos Galaxy': { img: 'image_74e13c.jpg', color: 'bg-lime-500', text: 'text-gray-900', border: 'border-lime-400' },
  'Bagre Leverkusen': { img: 'image_74e142.png', color: 'bg-red-600', text: 'text-red-100', border: 'border-red-500' },
  'Anta Gorda III': { img: 'image_74e160.png', color: 'bg-purple-900', text: 'text-purple-100', border: 'border-purple-500' },
  'Targaryen': { img: 'image_74e180.jpg', color: 'bg-red-900', text: 'text-red-100', border: 'border-red-700' },
  'Pombos Pútridos': { img: 'image_74e42a.png', color: 'bg-indigo-900', text: 'text-indigo-100', border: 'border-indigo-500' },
  'MIB': { img: 'image_74e448.jpg', color: 'bg-gray-900', text: 'text-gray-100', border: 'border-gray-500' },
};

const TEAM_FIXED_PLAYERS = {
  'ESC HX': [
    { name: 'HX Alpha', tier: 4 },
    { name: 'HX Beta', tier: 3 },
    { name: 'HX Gamma', tier: 3 },
    { name: 'HX Delta', tier: 2 },
    { name: 'HX Epsilon', tier: 2 },
    { name: 'HX Zeta', tier: 2 },
    { name: 'HX Theta', tier: 1 },
    { name: 'HX Iota', tier: 1 },
    { name: 'HX Kappa', tier: 1 }
  ],
  'Schalke 69': [
    { name: 'Schalke Fritz', tier: 4 },
    { name: 'Schalke Otto', tier: 3 },
    { name: 'Schalke Karl', tier: 3 },
    { name: 'Schalke Uwe', tier: 2 },
    { name: 'Schalke Max', tier: 2 },
    { name: 'Schalke Paul', tier: 2 },
    { name: 'Schalke Luis', tier: 1 },
    { name: 'Schalke Toni', tier: 1 },
    { name: 'Schalke Erik', tier: 1 }
  ],
  'Los Amostradinhos Galaxy': [
    { name: 'Galaxy Orion', tier: 4 },
    { name: 'Galaxy Sirius', tier: 3 },
    { name: 'Galaxy Vega', tier: 3 },
    { name: 'Galaxy Rigel', tier: 2 },
    { name: 'Galaxy Altair', tier: 2 },
    { name: 'Galaxy Deneb', tier: 2 },
    { name: 'Galaxy Betelgeuse', tier: 1 },
    { name: 'Galaxy Procyon', tier: 1 },
    { name: 'Galaxy Spica', tier: 1 }
  ],
  'Bagre Leverkusen': [
    { name: 'Bagre Artilheiro', tier: 4 },
    { name: 'Bagre Volante', tier: 3 },
    { name: 'Bagre Maestro', tier: 3 },
    { name: 'Bagre Zagueiro', tier: 2 },
    { name: 'Bagre Ala', tier: 2 },
    { name: 'Bagre Tabela', tier: 2 },
    { name: 'Bagre Linha', tier: 1 },
    { name: 'Bagre Pressão', tier: 1 },
    { name: 'Bagre Tímido', tier: 1 }
  ],
  'Anta Gorda III': [
    { name: 'Anta Capitão', tier: 4 },
    { name: 'Anta Parede', tier: 3 },
    { name: 'Anta Canela', tier: 3 },
    { name: 'Anta Fominha', tier: 2 },
    { name: 'Anta Tabela', tier: 2 },
    { name: 'Anta Rápida', tier: 2 },
    { name: 'Anta Trator', tier: 1 },
    { name: 'Anta Lenda', tier: 1 },
    { name: 'Anta Bagre', tier: 1 }
  ],
  'Targaryen': [
    { name: 'Dracarys Alpha', tier: 4 },
    { name: 'Dracarys Beta', tier: 3 },
    { name: 'Dracarys Gamma', tier: 3 },
    { name: 'Dracarys Delta', tier: 2 },
    { name: 'Dracarys Epsilon', tier: 2 },
    { name: 'Dracarys Zeta', tier: 2 },
    { name: 'Dracarys Eta', tier: 1 },
    { name: 'Dracarys Theta', tier: 1 },
    { name: 'Dracarys Iota', tier: 1 }
  ],
  'Pombos Pútridos': [
    { name: 'Pombo Rei', tier: 4 },
    { name: 'Pombo Asa', tier: 3 },
    { name: 'Pombo Bico', tier: 3 },
    { name: 'Pombo Voo', tier: 2 },
    { name: 'Pombo Curva', tier: 2 },
    { name: 'Pombo Túnel', tier: 2 },
    { name: 'Pombo Praça', tier: 1 },
    { name: 'Pombo Feira', tier: 1 },
    { name: 'Pombo Centro', tier: 1 }
  ],
  'MIB': [
    { name: 'Agente SPFC', tier: 4 },
    { name: 'Agente K', tier: 3 },
    { name: 'Agente Z', tier: 3 },
    { name: 'Agente X', tier: 2 },
    { name: 'Agente Y', tier: 2 },
    { name: 'Agente W', tier: 2 },
    { name: 'Agente V', tier: 1 },
    { name: 'Agente T', tier: 1 },
    { name: 'Agente R', tier: 1 }
  ]
};

const HAXBALL_NAMES = [
  "Salsicha", "Lagado", "Admin", "Host", "Macro", "Script", "Ping 15", "Vuvuzela", "Recruta", 
  "Capitão", "Veterano", "Noob", "Pro", "X1", "Fominha", "Goleiro Linha", "Banido", "Fake", 
  "Smurf", "Lenda", "Mito", "Bagre", "Perna", "Caneludo", "Artilheiro", "Zagueiro", "Paredão",
  "Lag", "Loss", "Delay", "Space", "Shift", "Ctrl", "Enter", "Kick", "Ban", "Room", "Red", "Blue"
];

const HAXBALL_EVENTS = [
  { text: "esqueceu de dar ready e o time começou com um a menos.", impact: -1 },
  { text: "está com ping 300 e não consegue se mexer.", impact: -2 },
  { text: "teve o teclado quebrado após um rage.", impact: -3 },
  { text: "foi banido da sala pelo admin sem motivo.", impact: -1 },
  { text: "está lagado pois a mãe ligou o microondas.", impact: -1 },
  { text: "foi jantar e deixou o boneco AFK.", impact: -2 },
  { text: "está discutindo no chat e esqueceu do jogo.", impact: -1 },
  { text: "trocou de navegador e o jogo fluiu melhor.", impact: 1 },
  { text: "comprou um teclado mecânico novo.", impact: 2 },
  { text: "assistiu tutorial de tabela no YouTube.", impact: 1 }
];

// --- UTILS ---
const getRandomName = () => HAXBALL_NAMES[Math.floor(Math.random() * HAXBALL_NAMES.length)];
const getRandomTier = (min = 1, max = 4) => Math.floor(Math.random() * (max - min + 1)) + min;
const calculateSalary = (tier) => tier * 150 + Math.floor(Math.random() * 50);

// --- COMPONENT ---

export default function AliensLeague() {
  // Game State
  const [screen, setScreen] = useState('menu'); // menu, dashboard, match, market, standings, simulation
  const [teams, setTeams] = useState([]);
  const [userTeamId, setUserTeamId] = useState(null);
  const [day, setDay] = useState(1);
  const [phase, setPhase] = useState('pre-season'); // pre-season, season, playoffs
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [transferMarket, setTransferMarket] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [money, setMoney] = useState(5000);
  const [dayResults, setDayResults] = useState([]);
  const [pendingOtherResults, setPendingOtherResults] = useState([]);
  
  // Match State
  const [currentMatch, setCurrentMatch] = useState(null);
  const [matchState, setMatchState] = useState('pre'); // pre, first-half, halftime, second-half, post
  const [selectedLineup, setSelectedLineup] = useState([]);
  const [matchLog, setMatchLog] = useState([]);
  const [scores, setScores] = useState({ home: 0, away: 0 });
  
  // Simulação Playoffs
  const [playoffBracket, setPlayoffBracket] = useState({ quarters: [], semis: [], final: [] });
  const [eliminatedSim, setEliminatedSim] = useState(false);

  // Inicialização
  useEffect(() => {
    initGame();
  }, []);

  const initGame = () => {
    const initialTeams = Object.keys(TEAM_ASSETS).map((name, index) => ({
      id: index,
      name,
      asset: TEAM_ASSETS[name],
      players: TEAM_FIXED_PLAYERS[name].map((p, i) => ({
        id: `p_${index}_${i}`,
        name: p.name,
        tier: p.tier,
        exp: 0,
        goals: 0,
        condition: 100,
        status: 'ok'
      })),
      stats: { p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 }
    }));
    setTeams(initialTeams);

    // Generate Market
    const market = Array.from({ length: 10 }, () => ({
      id: Math.random().toString(36).substr(2, 9),
      name: getRandomName(),
      tier: getRandomTier(3, 4),
      salary: calculateSalary(getRandomTier(3, 4)) * 1.2 // Inflated market price
    }));
    setTransferMarket(market);
  };

  const startGame = (teamId) => {
    setUserTeamId(teamId);
    setScreen('dashboard');
    generateCalendar(teamId);
  };

  const generateCalendar = (myTeamId) => {
    // 7 Pre-season games
    // Season: 1 game every 3 days (Train, Train, Game)
    // League format: Everyone plays everyone once (7 games)
    // Total regular season length: 7 rounds * 3 days = 21 days
    
    let events = [];
    
    // Pre-season (Days 1-7)
    for (let i = 1; i <= 7; i++) {
      const opponentId = (myTeamId + i) % 8;
      events.push({ day: i, type: 'pre-season', opponentId });
    }

    // Regular Season (starts day 8)
    const numTeams = 8;
    const rounds = numTeams - 1;
    const opponents = Array.from({ length: numTeams }, (_, id) => id).filter(id => id !== myTeamId);
    let currentDay = 8;

    for (let r = 0; r < rounds; r++) {
       events.push({ day: currentDay, type: 'training' });
        events.push({ day: currentDay + 1, type: 'training' });
        const opponentId = opponents[r];
        events.push({ day: currentDay + 2, type: 'league', round: r + 1, opponentId });
        currentDay += 3;
    }

    setCalendarEvents(events);
  };

  // --- LOGIC: MATCH ENGINE ---

  const startMatch = (matchType, opponentId) => {
    const userTeam = teams.find(t => t.id === userTeamId);
    const opponent = teams.find(t => t.id === opponentId);

    // Reset match state
    setCurrentMatch({
      type: matchType,
      userTeam,
      opponent,
      userEvents: [],
      opponentEvents: [],
    });
    setMatchState('pre');
    setScores({ home: 0, away: 0 });
    setMatchLog([]);
    setSelectedLineup([]); // User must select
    setScreen('match');
  };

  const togglePlayerSelection = (playerId) => {
    if (selectedLineup.includes(playerId)) {
      setSelectedLineup(selectedLineup.filter(id => id !== playerId));
    } else {
      if (selectedLineup.length < 5) {
        setSelectedLineup([...selectedLineup, playerId]);
      }
    }
  };

  const calculateTeamStrength = (teamPlayers, isUser, lineupIds = []) => {
    let activePlayers = isUser 
      ? teamPlayers.filter(p => lineupIds.includes(p.id))
      : teamPlayers.slice(0, 5); // AI picks first 5 sorted by Tier (assuming sorted, or just first 5)
      
    // AI Logic: Pick best 5 available
    if (!isUser) {
        activePlayers = [...teamPlayers].sort((a, b) => b.tier - a.tier).slice(0, 5);
    }

    const totalTier = activePlayers.reduce((sum, p) => sum + p.tier, 0);
    const randomFactor = Math.random() * 2; 
    return totalTier + randomFactor;
  };

  const simulateHalf = (half) => {
    if (selectedLineup.length !== 5) {
      alert("Selecione 5 jogadores!");
      return;
    }

    const userTeam = teams.find(t => t.id === userTeamId);
    const opponent = currentMatch.opponent;

    const userStrength = calculateTeamStrength(userTeam.players, true, selectedLineup);
    const oppStrength = calculateTeamStrength(opponent.players, false);

    // Base goals based on strength diff
    let userGoals = 0;
    let oppGoals = 0;
    
    const diff = userStrength - oppStrength;
    // Haxball is chaotic. Even bad teams score.
    const baseChance = 0.3; 
    
    // Simulation logic per 'tick' (3 ticks per half)
    for(let i=0; i<3; i++) {
        if (Math.random() < baseChance + (diff * 0.05)) userGoals++;
        if (Math.random() < baseChance - (diff * 0.05)) oppGoals++;
    }

    // Record scorers
    const newLogs = [];
    
    const oppLineup = [...opponent.players].sort((a,b) => b.tier - a.tier).slice(0,5);
    for (let i=0; i<userGoals; i++) {
        const scorerId = selectedLineup[Math.floor(Math.random() * 5)];
        const scorer = userTeam.players.find(p => p.id === scorerId);
        newLogs.push({ time: half === 1 ? Math.floor(Math.random()*7) : Math.floor(Math.random()*7)+7, text: `GOL DO ${userTeam.name.toUpperCase()}! ${scorer.name} chutou cruzado!`, team: 'user' });
    }
    for (let i=0; i<oppGoals; i++) {
        const scorer = oppLineup[Math.floor(Math.random() * 5)];
        newLogs.push({ time: half === 1 ? Math.floor(Math.random()*7) : Math.floor(Math.random()*7)+7, text: `GOL DO ${opponent.name.toUpperCase()}! ${scorer.name} fez de tabela!`, team: 'cpu' });
    }

    setScores(prev => ({ home: prev.home + userGoals, away: prev.away + oppGoals }));
    setMatchLog(prev => [...prev, ...newLogs]);
    setMatchState(half === 1 ? 'halftime' : 'post');

    const updatedTeamsGoals = [...teams];
    const uIdx = updatedTeamsGoals.findIndex(t => t.id === userTeamId);
    const oIdx = updatedTeamsGoals.findIndex(t => t.id === opponent.id);
    for (let i=0; i<userGoals; i++) {
        const sid = selectedLineup[Math.floor(Math.random() * 5)];
        const p = updatedTeamsGoals[uIdx].players.find(pl => pl.id === sid);
        if (p) p.goals = (p.goals || 0) + 1;
    }
    for (let i=0; i<oppGoals; i++) {
        const sp = oppLineup[Math.floor(Math.random() * 5)];
        const p = updatedTeamsGoals[oIdx].players.find(pl => pl.id === sp.id);
        if (p) p.goals = (p.goals || 0) + 1;
    }
    setTeams(updatedTeamsGoals);

    // If Pre-season, add XP
    if (currentMatch.type === 'pre-season') {
        const newTeams = [...teams];
        const tIdx = newTeams.findIndex(t => t.id === userTeamId);
        selectedLineup.forEach(pid => {
            const p = newTeams[tIdx].players.find(pl => pl.id === pid);
            if (p) {
                p.exp += 25;
                if (p.exp >= 100 && p.tier < 4) {
                    p.tier += 1;
                    p.exp = 0;
                    pushNotification(`UPGRADE! ${p.name} subiu para Tier ${p.tier}!`);
                }
            }
        });
        setTeams(newTeams);
    }

    if (half === 2) {
        if (currentMatch.type === 'league') {
            const otherTeams = teams.filter(t => t.id !== userTeamId && t.id !== opponent.id);
            const pairs = [];
            for (let i=0;i<otherTeams.length;i+=2) {
                if (otherTeams[i+1]) pairs.push([otherTeams[i], otherTeams[i+1]]);
            }
            const res = [];
            pairs.forEach(([t1,t2]) => {
                const s1 = calculateTeamStrength(t1.players, false);
                const s2 = calculateTeamStrength(t2.players, false);
                let g1 = 0, g2 = 0;
                for(let i=0;i<3;i++){
                    if (Math.random() < 0.3 + ((s1 - s2) * 0.05)) g1++;
                    if (Math.random() < 0.3 - ((s1 - s2) * 0.05)) g2++;
                }
                res.push({ t1Id: t1.id, t2Id: t2.id, g1, g2 });
            });
            setPendingOtherResults(res);
            setDayResults([
                { home: currentMatch.userTeam.name, away: currentMatch.opponent.name, gh: scores.home + userGoals, ga: scores.away + oppGoals },
                ...res.map(r => ({ home: teams.find(t=>t.id===r.t1Id).name, away: teams.find(t=>t.id===r.t2Id).name, gh: r.g1, ga: r.g2 }))
            ]);
        } else if (currentMatch.type === 'pre-season') {
            const otherTeams = teams.filter(t => t.id !== userTeamId && t.id !== opponent.id);
            const pairs = [];
            for (let i=0;i<otherTeams.length;i+=2) {
                if (otherTeams[i+1]) pairs.push([otherTeams[i], otherTeams[i+1]]);
            }
            const res = [];
            const newTeamsG = [...teams];
            pairs.forEach(([t1,t2]) => {
                const s1 = calculateTeamStrength(t1.players, false);
                const s2 = calculateTeamStrength(t2.players, false);
                let g1 = 0, g2 = 0;
                for(let i=0;i<3;i++){
                    if (Math.random() < 0.3 + ((s1 - s2) * 0.05)) g1++;
                    if (Math.random() < 0.3 - ((s1 - s2) * 0.05)) g2++;
                }
                const l1 = [...t1.players].sort((a,b)=>b.tier-a.tier).slice(0,5);
                const l2 = [...t2.players].sort((a,b)=>b.tier-a.tier).slice(0,5);
                const i1 = newTeamsG.findIndex(tt=>tt.id===t1.id);
                const i2 = newTeamsG.findIndex(tt=>tt.id===t2.id);
                for(let i=0;i<g1;i++){
                    const sp = l1[Math.floor(Math.random()*5)];
                    const p = newTeamsG[i1].players.find(pl=>pl.id===sp.id);
                    if (p) p.goals = (p.goals||0)+1;
                }
                for(let i=0;i<g2;i++){
                    const sp = l2[Math.floor(Math.random()*5)];
                    const p = newTeamsG[i2].players.find(pl=>pl.id===sp.id);
                    if (p) p.goals = (p.goals||0)+1;
                }
                res.push({ home: t1.name, away: t2.name, gh: g1, ga: g2 });
            });
            setTeams(newTeamsG);
            setDayResults([{ home: currentMatch.userTeam.name, away: currentMatch.opponent.name, gh: scores.home + userGoals, ga: scores.away + oppGoals }, ...res]);
        }
    }
  };

  const finishMatch = () => {
    if (currentMatch.type === 'league') {
        updateLeagueStandings(userTeamId, currentMatch.opponent.id, scores.home, scores.away);
        const nt = [...teams];
        pendingOtherResults.forEach(r => {
            updateLeagueStandings(r.t1Id, r.t2Id, r.g1, r.g2);
            const t1Idx = nt.findIndex(t=>t.id===r.t1Id);
            const t2Idx = nt.findIndex(t=>t.id===r.t2Id);
            const l1 = [...nt[t1Idx].players].sort((a,b)=>b.tier-a.tier).slice(0,5);
            const l2 = [...nt[t2Idx].players].sort((a,b)=>b.tier-a.tier).slice(0,5);
            for(let i=0;i<r.g1;i++){
                const sp = l1[Math.floor(Math.random()*5)];
                const p = nt[t1Idx].players.find(pl=>pl.id===sp.id);
                if (p) p.goals = (p.goals||0)+1;
            }
            for(let i=0;i<r.g2;i++){
                const sp = l2[Math.floor(Math.random()*5)];
                const p = nt[t2Idx].players.find(pl=>pl.id===sp.id);
                if (p) p.goals = (p.goals||0)+1;
            }
        });
        setTeams(nt);
        setPendingOtherResults([]);
    }
    
    setScreen('dashboard');
    advanceDay();
  };

  // --- LOGIC: SIMULATION & LEAGUE ---

  const updateLeagueStandings = (homeId, awayId, homeGoals, awayGoals) => {
     setTeams(prevTeams => {
         return prevTeams.map(team => {
             if (team.id === homeId) {
                 return updateTeamStats(team, homeGoals, awayGoals);
             }
             if (team.id === awayId) {
                 return updateTeamStats(team, awayGoals, homeGoals);
             }
             return team;
         });
     });
  };

  const updateTeamStats = (team, gf, ga) => {
      let pts = 0;
      if (gf > ga) pts = 3;
      else if (gf === ga) pts = 1;
      
      return {
          ...team,
          stats: {
              p: team.stats.p + 1,
              w: team.stats.w + (gf > ga ? 1 : 0),
              d: team.stats.d + (gf === ga ? 1 : 0),
              l: team.stats.l + (gf < ga ? 1 : 0),
              gf: team.stats.gf + gf,
              ga: team.stats.ga + ga,
              pts: team.stats.pts + pts
          }
      };
  };

  const simulateOtherMatches = () => {
      // Find other pairs for this round (simplified: just random results for everyone else)
      const otherTeams = teams.filter(t => t.id !== userTeamId && t.id !== currentMatch.opponent.id);
      // Pair them up roughly
      const pairs = [];
      for(let i=0; i<otherTeams.length; i+=2) {
          if (otherTeams[i+1]) pairs.push([otherTeams[i], otherTeams[i+1]]);
      }

      pairs.forEach(pair => {
          const t1 = pair[0];
          const t2 = pair[1];
          // Sim random result
          const g1 = Math.floor(Math.random() * 4);
          const g2 = Math.floor(Math.random() * 4);
          updateLeagueStandings(t1.id, t2.id, g1, g2);
      });
  };

  const pushNotification = (text, duration = 3000) => {
      setNotifications(prev => [...prev, text]);
      setTimeout(() => {
          setNotifications(prev => prev.filter(n => n !== text));
      }, duration);
  };

  const advanceDay = () => {
      const nextDay = day + 1;
      setDay(nextDay);

      // Check Phase Transitions
      if (nextDay > 7 && phase === 'pre-season') {
          setPhase('season');
          pushNotification("A Temporada Regular Começou!");
      }
      
      // End of Regular Season (Day 30 approx)
      const totalRegularDays = 7 + (7 * 3); // 28 days
      if (nextDay >= totalRegularDays && phase === 'season') {
          setPhase('playoffs');
          setupPlayoffs();
      }
  };

  const setupPlayoffs = () => {
      // Sort teams
      const sortedTeams = [...teams].sort((a, b) => b.stats.pts - a.stats.pts || (b.stats.gf - b.stats.ga) - (a.stats.gf - a.stats.ga));
      
      const myRank = sortedTeams.findIndex(t => t.id === userTeamId);
      
      pushNotification(`Fim da temporada! Você terminou em ${myRank + 1}º lugar.`);

      if (myRank >= 6) { // 7th and 8th eliminated
          setEliminatedSim(true);
          setScreen('simulation');
      } else {
          // Setup Bracket
          // 1st & 2nd -> Semis
          // 3rd vs 6th (Q1)
          // 4th vs 5th (Q2)
          setPlayoffBracket({
              quarters: [
                  { t1: sortedTeams[2], t2: sortedTeams[5], winner: null },
                  { t1: sortedTeams[3], t2: sortedTeams[4], winner: null }
              ],
              semis: [
                  { t1: sortedTeams[0], t2: null, from: 'Q2' }, // 1st plays winner of 4v5 normally
                  { t1: sortedTeams[1], t2: null, from: 'Q1' }
              ],
              final: []
          });
          
          if (myRank >= 2) {
             // I am in quarters
             setScreen('dashboard'); // Wait for match prompt
          } else {
             // I am in semis, simulate quarters
             simulateQuarters(sortedTeams);
          }
      }
  };

  const simulatePlayoffMatch = (t1, t2) => {
      const s1 = calculateTeamStrength(t1.players, false);
      const s2 = calculateTeamStrength(t2.players, false);
      let g1 = 0, g2 = 0;
      for(let i=0;i<3;i++){
          if (Math.random() < 0.3 + ((s1 - s2) * 0.05)) g1++;
          if (Math.random() < 0.3 - ((s1 - s2) * 0.05)) g2++;
      }
      if (g1 === g2) {
          if (Math.random() < 0.5) g1++; else g2++;
      }
      const nt = [...teams];
      const i1 = nt.findIndex(tt=>tt.id===t1.id);
      const i2 = nt.findIndex(tt=>tt.id===t2.id);
      const l1 = [...nt[i1].players].sort((a,b)=>b.tier-a.tier).slice(0,5);
      const l2 = [...nt[i2].players].sort((a,b)=>b.tier-a.tier).slice(0,5);
      for(let i=0;i<g1;i++){ const sp=l1[Math.floor(Math.random()*5)]; const p=nt[i1].players.find(pl=>pl.id===sp.id); if(p) p.goals=(p.goals||0)+1; }
      for(let i=0;i<g2;i++){ const sp=l2[Math.floor(Math.random()*5)]; const p=nt[i2].players.find(pl=>pl.id===sp.id); if(p) p.goals=(p.goals||0)+1; }
      setTeams(nt);
      return { g1, g2, winner: g1 > g2 ? t1 : t2 };
  };

  const simulateQuarters = (sortedTeams) => {
      const q1 = { t1: sortedTeams[2], t2: sortedTeams[5] };
      const q2 = { t1: sortedTeams[3], t2: sortedTeams[4] };
      const r1 = simulatePlayoffMatch(q1.t1, q1.t2);
      const r2 = simulatePlayoffMatch(q2.t1, q2.t2);
      const s1 = { t1: sortedTeams[0], t2: r2.winner };
      const s2 = { t1: sortedTeams[1], t2: r1.winner };
      const rs1 = simulatePlayoffMatch(s1.t1, s1.t2);
      const rs2 = simulatePlayoffMatch(s2.t1, s2.t2);
      const fin = { t1: rs1.winner, t2: rs2.winner };
      const rf = simulatePlayoffMatch(fin.t1, fin.t2);
      setPlayoffBracket({
          quarters: [ { t1: q1.t1, t2: q1.t2, winner: r1.winner }, { t1: q2.t1, t2: q2.t2, winner: r2.winner } ],
          semis: [ { t1: s1.t1, t2: s1.t2, winner: rs1.winner }, { t1: s2.t1, t2: s2.t2, winner: rs2.winner } ],
          final: [ { t1: fin.t1, t2: fin.t2, winner: rf.winner } ]
      });
      setDayResults([
          { home: q1.t1.name, away: q1.t2.name, gh: r1.g1, ga: r1.g2 },
          { home: q2.t1.name, away: q2.t2.name, gh: r2.g1, ga: r2.g2 },
          { home: s1.t1.name, away: s1.t2.name, gh: rs1.g1, ga: rs1.g2 },
          { home: s2.t1.name, away: s2.t2.name, gh: rs2.g1, ga: rs2.g2 },
          { home: fin.t1.name, away: fin.t2.name, gh: rf.g1, ga: rf.g2 }
      ]);
      pushNotification(`Campeão: ${rf.winner.name}`);
  };

  // --- UI COMPONENTS ---

  const TeamCard = ({ team, onClick, selected }) => (
    <div 
        onClick={() => onClick(team.id)}
        className={`cursor-pointer relative overflow-hidden rounded-xl p-4 border-4 transition-all hover:scale-105 ${selected ? 'ring-4 ring-white scale-105' : ''} ${team.asset.color} ${team.asset.border}`}
    >
        <div className="flex flex-col items-center z-10 relative">
             <img src={team.asset.img} alt={team.name} className="w-20 h-20 object-contain bg-white/10 rounded-full mb-3" />
             <h3 className={`font-bold text-lg text-center uppercase leading-tight ${team.asset.text}`}>{team.name}</h3>
             <div className="mt-2 bg-black/30 px-3 py-1 rounded-full text-xs font-mono text-white">
                Elenco: {team.players.reduce((acc, p) => acc + p.tier, 0)} ⭐
             </div>
        </div>
    </div>
  );

  const PlayerRow = ({ player, action, actionLabel, isActionDisabled }) => (
      <div className="flex items-center justify-between bg-gray-800 p-3 rounded mb-2 border border-gray-700">
          <div className="flex items-center gap-3">
              <div className={`w-8 h-8 flex items-center justify-center rounded font-bold ${player.tier === 4 ? 'bg-yellow-500 text-black' : player.tier === 3 ? 'bg-purple-500 text-white' : player.tier === 2 ? 'bg-blue-500 text-white' : 'bg-gray-500 text-white'}`}>
                  T{player.tier}
              </div>
              <div>
                  <div className="font-bold text-white">{player.name}</div>
                  {player.exp > 0 && <div className="text-xs text-green-400">XP: {player.exp}%</div>}
              </div>
          </div>
          {action && (
              <button 
                onClick={() => action(player)}
                disabled={isActionDisabled}
                className={`px-3 py-1 rounded text-xs font-bold uppercase ${isActionDisabled ? 'bg-gray-600 text-gray-400' : 'bg-green-600 hover:bg-green-500 text-white'}`}
              >
                  {actionLabel}
              </button>
          )}
      </div>
  );

  const buyPlayer = (player) => {
      if (money < player.salary) {
          alert("Sem dinheiro para o salário!");
          return;
      }
      // RNG Competition
      if (Math.random() > 0.5) {
          alert("O Bagre Leverkusen cobriu sua oferta! Jogador perdido.");
          setTransferMarket(transferMarket.filter(p => p.id !== player.id));
          return;
      }

      setMoney(money - player.salary);
      setTransferMarket(transferMarket.filter(p => p.id !== player.id));
      
      const newTeams = [...teams];
      const myTeam = newTeams.find(t => t.id === userTeamId);
      
      // Remove worst player to make space (cap 9)
      const worstPlayer = myTeam.players.sort((a,b) => a.tier - b.tier)[0];
      myTeam.players = myTeam.players.filter(p => p.id !== worstPlayer.id);
      
      myTeam.players.push({
          ...player,
          exp: 0,
          goals: 0,
          condition: 100,
          status: 'ok'
      });
      setTeams(newTeams);
      alert(`Contratado! ${worstPlayer.name} foi dispensado.`);
  };

  if (screen === 'menu') {
      return (
          <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 font-sans">
              <h1 className="text-5xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 tracking-tighter">ALIEN'S LEAGUE</h1>
              <p className="text-gray-400 mb-8 text-lg">Manager Haxball Simulator</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
                  {teams.map(team => (
                      <TeamCard 
                        key={team.id} 
                        team={team} 
                        selected={userTeamId === team.id}
                        onClick={setUserTeamId} 
                      />
                  ))}
              </div>

              <button 
                onClick={() => userTeamId !== null && startGame(userTeamId)}
                disabled={userTeamId === null}
                className={`mt-10 px-12 py-4 rounded-full text-xl font-black tracking-wider uppercase transition-all transform hover:scale-110 ${userTeamId !== null ? 'bg-green-500 hover:bg-green-400 text-gray-900 shadow-[0_0_20px_rgba(34,197,94,0.6)]' : 'bg-gray-700 text-gray-500 cursor-not-allowed'}`}
              >
                  Iniciar Carreira
              </button>
          </div>
      );
  }

  const userTeam = teams.find(t => t.id === userTeamId);
  const todayEvent = calendarEvents.find(e => e.day === day);

  return (
      <div className="min-h-screen bg-gray-900 text-gray-100 font-sans overflow-hidden flex">
          {/* SIDEBAR */}
          <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
              <div className={`p-6 ${userTeam.asset.color}`}>
                  <img src={userTeam.asset.img} className="w-16 h-16 mx-auto mb-2 bg-white/20 rounded-full" />
                  <h2 className="text-xl font-black text-center leading-none">{userTeam.name}</h2>
              </div>
              
              <nav className="flex-1 p-4 space-y-2">
                  <button onClick={() => setScreen('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded font-bold transition-colors ${screen === 'dashboard' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700'}`}>
                      <Activity size={20} /> Visão Geral
                  </button>
                  <button onClick={() => setScreen('squad')} className={`w-full flex items-center gap-3 px-4 py-3 rounded font-bold transition-colors ${screen === 'squad' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700'}`}>
                      <Users size={20} /> Elenco
                  </button>
                  <button onClick={() => setScreen('market')} className={`w-full flex items-center gap-3 px-4 py-3 rounded font-bold transition-colors ${screen === 'market' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700'}`}>
                      <DollarSign size={20} /> Transferências
                  </button>
                  <button onClick={() => setScreen('calendar')} className={`w-full flex items-center gap-3 px-4 py-3 rounded font-bold transition-colors ${screen === 'calendar' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700'}`}>
                      <Calendar size={20} /> Calendário
                  </button>
                  <button onClick={() => setScreen('standings')} className={`w-full flex items-center gap-3 px-4 py-3 rounded font-bold transition-colors ${screen === 'standings' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700'}`}>
                      <Trophy size={20} /> Liga
                  </button>
                  <button onClick={() => setScreen('scorers')} className={`w-full flex items-center gap-3 px-4 py-3 rounded font-bold transition-colors ${screen === 'scorers' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700'}`}>
                      <Award size={20} /> Artilharia
                  </button>
              </nav>

              <div className="p-4 border-t border-gray-700">
                  <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400">Dia {day}</span>
                      <span className={`text-xs uppercase font-bold px-2 py-0.5 rounded ${phase === 'pre-season' ? 'bg-blue-900 text-blue-300' : 'bg-green-900 text-green-300'}`}>{phase === 'pre-season' ? 'Pré-Temp' : 'Temporada'}</span>
                  </div>
                  <div className="text-green-400 font-mono text-xl">R$ {money},00</div>
              </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="flex-1 overflow-y-auto p-8 relative">
              
              {/* NOTIFICATIONS */}
              <div className="absolute top-4 right-4 w-80 space-y-2 pointer-events-none z-50">
                  {notifications.map((note, i) => (
                      <div key={i} className="bg-gray-800 border-l-4 border-yellow-500 text-white p-3 rounded shadow-lg text-sm animate-fade-in-down">
                          {note}
                      </div>
                  ))}
              </div>

              {screen === 'dashboard' && (
                  <div className="max-w-4xl mx-auto">
                      <header className="mb-8">
                          <h1 className="text-3xl font-bold mb-2">Painel de Controle</h1>
                          <p className="text-gray-400">Gerencie o {userTeam.name} rumo à glória intergaláctica.</p>
                      </header>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                              <h3 className="text-gray-400 text-sm uppercase font-bold mb-2">Próximo Compromisso</h3>
                              <div className="text-2xl font-bold text-white mb-4">
                                  {todayEvent?.type === 'training' ? 'Treino Tático' : todayEvent?.type === 'pre-season' ? 'Amistoso' : 'Liga Oficial'}
                              </div>
                              
                              {todayEvent?.type === 'training' ? (
                                  <button onClick={advanceDay} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded flex items-center justify-center gap-2">
                                      <TrendingUp size={18} /> Treinar Equipe
                                  </button>
                              ) : (
                                  <button onClick={() => startMatch(todayEvent.type, todayEvent.opponentId)} className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded flex items-center justify-center gap-2">
                                      <PlayCircle size={18} /> Jogar Partida
                                  </button>
                              )}
                          </div>

                          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 col-span-2">
                              <h3 className="text-gray-400 text-sm uppercase font-bold mb-4">Status do Elenco</h3>
                              <div className="grid grid-cols-2 gap-4">
                                  {userTeam.players.slice(0,4).map(p => (
                                      <div key={p.id} className="flex items-center justify-between bg-gray-900 p-2 rounded">
                                          <span className="font-bold">{p.name}</span>
                                          <div className="flex gap-2">
                                            <span className="text-xs bg-gray-700 px-1 rounded text-gray-300">T{p.tier}</span>
                                            {p.exp > 0 && <span className="text-xs text-green-500">XP {p.exp}</span>}
                                          </div>
                                      </div>
                                  ))}
                                  <div className="text-center col-span-2 text-gray-500 text-sm italic mt-2">
                                      + {userTeam.players.length - 4} jogadores disponíveis
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              )}

              {screen === 'match' && currentMatch && (
                  <div className="max-w-3xl mx-auto bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-2xl">
                      {/* SCOREBOARD */}
                      <div className="bg-black p-6 flex justify-between items-center relative">
                          <div className="text-center w-1/3">
                              <div className={`text-xl font-bold ${currentMatch.userTeam.asset.text}`}>{currentMatch.userTeam.name}</div>
                              <div className="text-5xl font-black mt-2 font-mono">{scores.home}</div>
                          </div>
                          <div className="text-center w-1/3 flex flex-col items-center">
                              <div className="bg-gray-800 px-3 py-1 rounded text-xs font-mono mb-2">
                                  {matchState === 'pre' ? 'PRÉ-JOGO' : matchState === 'halftime' ? 'INTERVALO' : matchState === 'post' ? 'FIM DE JOGO' : '1º TEMPO'}
                              </div>
                              <div className="text-gray-500 font-bold">X</div>
                          </div>
                          <div className="text-center w-1/3">
                              <div className={`text-xl font-bold ${currentMatch.opponent.asset.text}`}>{currentMatch.opponent.name}</div>
                              <div className="text-5xl font-black mt-2 font-mono">{scores.away}</div>
                          </div>
                      </div>

                      {/* FIELD / ACTION */}
                      <div className="p-6 min-h-[400px] flex flex-col">
                          {matchState === 'pre' || matchState === 'halftime' ? (
                              <div className="flex-1">
                                  <h3 className="text-center font-bold text-yellow-400 mb-4 uppercase tracking-widest">
                                    {matchState === 'pre' ? 'Escale 5 titulares' : 'Faça Substituições'}
                                  </h3>
                                  <div className="grid grid-cols-1 gap-2 mb-6">
                                      {currentMatch.userTeam.players.map(player => (
                                          <div 
                                            key={player.id} 
                                            onClick={() => togglePlayerSelection(player.id)}
                                            className={`p-3 rounded cursor-pointer border flex justify-between ${selectedLineup.includes(player.id) ? 'bg-green-900/50 border-green-500' : 'bg-gray-700 border-transparent'}`}
                                          >
                                              <span>{player.name}</span>
                                              <div className="flex gap-2">
                                                  <span className="font-mono text-sm text-gray-400">T{player.tier}</span>
                                                  {selectedLineup.includes(player.id) && <span className="text-green-400 font-bold">TITULAR</span>}
                                              </div>
                                          </div>
                                      ))}
                                  </div>
                                  <div className="text-center text-sm text-gray-400 mb-4">
                                      Selecionados: {selectedLineup.length}/5
                                  </div>
                                  <button 
                                    onClick={() => simulateHalf(matchState === 'pre' ? 1 : 2)}
                                    disabled={selectedLineup.length !== 5}
                                    className={`w-full py-4 rounded font-black uppercase tracking-widest ${selectedLineup.length === 5 ? 'bg-green-600 hover:bg-green-500 text-white' : 'bg-gray-700 text-gray-500'}`}
                                  >
                                      {matchState === 'pre' ? 'Iniciar Jogo' : 'Voltar pro 2º Tempo'}
                                  </button>
                              </div>
                          ) : (
                              <div className="flex-1 flex flex-col">
                                  <div className="flex-1 space-y-2 mb-6 overflow-y-auto max-h-64 pr-2 custom-scrollbar">
                                      {matchLog.map((log, i) => (
                                          <div key={i} className={`p-2 rounded text-sm border-l-4 animate-fade-in-left ${log.team === 'user' ? 'bg-green-900/20 border-green-500' : 'bg-red-900/20 border-red-500'}`}>
                                              <span className="font-mono font-bold opacity-50 mr-2">{log.time}'</span>
                                              {log.text}
                                          </div>
                                      ))}
                                      {matchLog.length === 0 && <div className="text-center text-gray-600 italic mt-10">Bola rolando...</div>}
                                  </div>
                                  {matchState === 'post' && dayResults.length > 0 && (
                                      <div className="bg-gray-900 p-4 rounded border border-gray-700 mb-4">
                                          <div className="font-bold mb-2">Resultados do Dia</div>
                                          <div className="space-y-2">
                                              {dayResults.map((r, i) => (
                                                  <div key={i} className="flex justify-between text-sm">
                                                      <span className="font-bold">{r.home}</span>
                                                      <span className="font-mono">{r.gh} - {r.ga}</span>
                                                      <span className="font-bold text-right">{r.away}</span>
                                                  </div>
                                              ))}
                                          </div>
                                      </div>
                                  )}
                                  
                                  {matchState === 'post' && (
                                      <button onClick={finishMatch} className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded font-bold uppercase">
                                          Continuar
                                      </button>
                                  )}
                              </div>
                          )}
                      </div>
                  </div>
              )}

              {screen === 'market' && (
                  <div className="max-w-4xl mx-auto">
                      <h2 className="text-2xl font-bold mb-6">Mercado de Transferências</h2>
                      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                          {transferMarket.map(player => (
                              <div key={player.id} className="flex items-center justify-between border-b border-gray-700 py-4 last:border-0">
                                  <div>
                                      <div className="font-bold text-lg">{player.name}</div>
                                      <div className="text-sm text-gray-400">Tier {player.tier} • Salário: R${player.salary}</div>
                                  </div>
                                  <button 
                                    onClick={() => buyPlayer(player)}
                                    className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded font-bold text-sm"
                                  >
                                      Contratar
                                  </button>
                              </div>
                          ))}
                      </div>
                  </div>
              )}

              {screen === 'calendar' && (
                  <div className="max-w-4xl mx-auto">
                      <h2 className="text-2xl font-bold mb-6">Calendário</h2>
                      <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
                          <table className="w-full text-left">
                              <thead className="bg-gray-900 text-gray-400 uppercase text-xs font-bold">
                                  <tr>
                                      <th className="p-4">Dia</th>
                                      <th className="p-4">Tipo</th>
                                      <th className="p-4">Adversário</th>
                                      <th className="p-4 text-center">Ação</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  {[...calendarEvents].sort((a,b) => a.day - b.day).map((evt, idx) => {
                                      const opp = evt.opponentId !== undefined ? teams.find(t => t.id === evt.opponentId) : null;
                                      const tipo = evt.type === 'training' ? 'Treino Tático' : evt.type === 'pre-season' ? 'Amistoso' : `Liga • Rodada ${evt.round}`;
                                      return (
                                          <tr key={idx} className="border-b border-gray-700">
                                              <td className="p-4 font-mono text-gray-400">{evt.day}</td>
                                              <td className="p-4 font-bold">{tipo}</td>
                                              <td className="p-4">{opp ? opp.name : '-'}</td>
                                              <td className="p-4 text-center">
                                                  {evt.day === day && (
                                                      evt.type === 'training' ? (
                                                          <button onClick={advanceDay} className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded text-sm font-bold">Treinar</button>
                                                      ) : (
                                                          <button onClick={() => startMatch(evt.type, evt.opponentId)} className="bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded text-sm font-bold">Jogar</button>
                                                      )
                                                  )}
                                              </td>
                                          </tr>
                                      );
                                  })}
                              </tbody>
                          </table>
                      </div>
                  </div>
              )}

              {screen === 'squad' && (
                  <div className="max-w-4xl mx-auto">
                      <h2 className="text-2xl font-bold mb-6">Gerenciar Elenco</h2>
                      <div className="grid gap-2">
                          {userTeam.players.map(player => (
                              <PlayerRow 
                                key={player.id} 
                                player={player} 
                                action={() => {
                                    const newName = prompt("Novo nome:", player.name);
                                    if (newName) {
                                        const newTeams = [...teams];
                                        const p = newTeams.find(t => t.id === userTeamId).players.find(pl => pl.id === player.id);
                                        p.name = newName;
                                        setTeams(newTeams);
                                    }
                                }} 
                                actionLabel="Renomear" 
                                isActionDisabled={false}
                              />
                          ))}
                      </div>
                  </div>
              )}

              {screen === 'standings' && (
                  <div className="max-w-4xl mx-auto">
                      <h2 className="text-2xl font-bold mb-6">Tabela da Liga</h2>
                      <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
                          <table className="w-full text-left">
                              <thead className="bg-gray-900 text-gray-400 uppercase text-xs font-bold">
                                  <tr>
                                      <th className="p-4">Pos</th>
                                      <th className="p-4">Time</th>
                                      <th className="p-4 text-center">P</th>
                                      <th className="p-4 text-center">V</th>
                                      <th className="p-4 text-center">E</th>
                                      <th className="p-4 text-center">D</th>
                                      <th className="p-4 text-center">SG</th>
                                      <th className="p-4 text-center">Pts</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  {[...teams].sort((a, b) => b.stats.pts - a.stats.pts || (b.stats.gf - b.stats.ga) - (a.stats.gf - a.stats.ga)).map((team, index) => (
                                      <tr key={team.id} className={`border-b border-gray-700 ${team.id === userTeamId ? 'bg-green-900/20' : ''}`}>
                                          <td className="p-4 font-mono text-gray-500">{index + 1}</td>
                                          <td className="p-4 font-bold flex items-center gap-2">
                                              <div className={`w-3 h-3 rounded-full ${team.asset.color}`}></div>
                                              {team.name}
                                          </td>
                                          <td className="p-4 text-center font-mono">{team.stats.p}</td>
                                          <td className="p-4 text-center font-mono">{team.stats.w}</td>
                                          <td className="p-4 text-center font-mono">{team.stats.d}</td>
                                          <td className="p-4 text-center font-mono">{team.stats.l}</td>
                                          <td className="p-4 text-center font-mono">{team.stats.gf - team.stats.ga}</td>
                                          <td className="p-4 text-center font-bold text-white">{team.stats.pts}</td>
                                      </tr>
                                  ))}
                              </tbody>
                          </table>
                      </div>
                  </div>
              )}

              {screen === 'scorers' && (
                  <div className="max-w-4xl mx-auto">
                      <h2 className="text-2xl font-bold mb-6">Artilharia</h2>
                      <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
                          <table className="w-full text-left">
                              <thead className="bg-gray-900 text-gray-400 uppercase text-xs font-bold">
                                  <tr>
                                      <th className="p-4">Jogador</th>
                                      <th className="p-4">Time</th>
                                      <th className="p-4 text-center">Gols</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  {teams.flatMap(t => t.players.map(p => ({...p, teamName: t.name}))).sort((a,b) => (b.goals||0) - (a.goals||0)).slice(0,50).map((p, idx) => (
                                      <tr key={`${p.id}-${idx}`} className="border-b border-gray-700">
                                          <td className="p-4 font-bold">{p.name}</td>
                                          <td className="p-4">{p.teamName}</td>
                                          <td className="p-4 text-center font-mono text-white">{p.goals || 0}</td>
                                      </tr>
                                  ))}
                              </tbody>
                          </table>
                      </div>
                  </div>
              )}

              {screen === 'simulation' && (
                  <div className="flex flex-col items-center justify-center h-full">
                      <h2 className="text-4xl font-black text-red-500 mb-4">ELIMINADO!</h2>
                      <p className="text-gray-400 mb-8">Seu time não tankou a liga. Simulando o resto do campeonato...</p>
                      <div className="bg-black p-8 rounded font-mono text-green-400 w-full max-w-md h-64 overflow-y-auto">
                          {/* Mock simulation text */}
                          <div className="animate-pulse">
                              Simulando Quartas de Final...<br/>
                              Targaryen 2 x 1 Pombos<br/>
                              Anta Gorda 0 x 3 MIB<br/><br/>
                              Simulando Semifinais...<br/>
                              ESC HX 1 x 0 Targaryen<br/>
                              MIB 2 x 2 Schalke (MIB vence nos pênaltis)<br/><br/>
                              FINAL:<br/>
                              ESC HX vs MIB...
                          </div>
                      </div>
                      <button onClick={() => window.location.reload()} className="mt-8 bg-white text-black px-8 py-3 rounded font-bold uppercase hover:bg-gray-200">
                          Reiniciar Jogo
                      </button>
                  </div>
              )}
          </div>
      </div>
  );
}