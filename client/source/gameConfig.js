const CONFIG = {
    gameTypes: [
        {
            id: 1,
            name: "standard",
            options: [
                {id:'paper', name:'Paper'},
                {id:'rock', name:'Rock',},
                {id:'scissor', name:'Scissor'}
            ],
            wins: {
                'paper': ['rock'],
                'scissor': ['paper'],
                'rock': ['scissor']
            },
            rounds: 3
        }
    ],
    gameModes: [
        { id: 1, label: "Player Vs Computer"},
        { id: 2, label: "Computer Vs Computer"}
    ]
}
export default CONFIG
