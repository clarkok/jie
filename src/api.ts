export const BOARD_COLUMNS = 9;
export const BOARD_ROWS = 10;

export enum PieceKind {
    _Unknown = -8,
    _Pawn = -7,
    _Cannon = -6,
    _King = -5,
    _Mandarin = -4,
    _Elephant = -3,
    _Knight = -2,
    _Rook = -1,
    Empty = 0,
    Rook = 1,
    Knight = 2,
    Elephant = 3,
    Mandarin = 4,
    King = 5,
    Cannon = 6,
    Pawn = 7,
    Unknown = 8,
}

export interface Position {
    row: number; // 0 based index, bottom to up, with red in the bottom
    column: number; // 0 based index, right to left, with red in the bottom
}

export type Board = PieceKind[]; // 8x9

// visible state to player
// the board are rotated for the black side so the self side is always on the bottom
export interface State {
    isRed: boolean;
    pieces: { kind: PieceKind; pos: Position }[];
    deads: PieceKind[];
}

// the board is in the direction that the red side is on the bottom
export interface Session {
    init: Board; // initial placement

    board: Board; // current board
    deads: {
        kind: PieceKind;
        visible: boolean;
    }[];
}

export const PIECE_CHARACTERS: Record<PieceKind, string> = {
    [PieceKind._Unknown]: ' ',
    [PieceKind._Pawn]: '卒',
    [PieceKind._Cannon]: '炮',
    [PieceKind._King]: '将',
    [PieceKind._Mandarin]: '士',
    [PieceKind._Elephant]: '象',
    [PieceKind._Knight]: '马',
    [PieceKind._Rook]: '车',
    [PieceKind.Empty]: ' ', // V red  ^ black
    [PieceKind.Rook]: '车',
    [PieceKind.Knight]: '马',
    [PieceKind.Elephant]: '相',
    [PieceKind.Mandarin]: '仕',
    [PieceKind.King]: '帅',
    [PieceKind.Cannon]: '炮',
    [PieceKind.Pawn]: '兵',
    [PieceKind.Unknown]: ' ',
};

export const ACT_PIECE = [
    [
        PieceKind.Rook,
        PieceKind.Knight,
        PieceKind.Elephant,
        PieceKind.Mandarin,
        PieceKind.King,
        PieceKind.Mandarin,
        PieceKind.Elephant,
        PieceKind.King,
        PieceKind.Rook,
    ],
    [
        PieceKind.Empty,
        PieceKind.Empty,
        PieceKind.Empty,
        PieceKind.Empty,
        PieceKind.Empty,
        PieceKind.Empty,
        PieceKind.Empty,
        PieceKind.Empty,
        PieceKind.Empty,
    ],
    [
        PieceKind.Empty,
        PieceKind.Cannon,
        PieceKind.Empty,
        PieceKind.Empty,
        PieceKind.Empty,
        PieceKind.Empty,
        PieceKind.Empty,
        PieceKind.Cannon,
        PieceKind.Empty,
    ],
    [
        PieceKind.Pawn,
        PieceKind.Empty,
        PieceKind.Pawn,
        PieceKind.Empty,
        PieceKind.Pawn,
        PieceKind.Empty,
        PieceKind.Pawn,
        PieceKind.Empty,
        PieceKind.Pawn,
    ],
    [
        PieceKind.Empty,
        PieceKind.Empty,
        PieceKind.Empty,
        PieceKind.Empty,
        PieceKind.Empty,
        PieceKind.Empty,
        PieceKind.Empty,
        PieceKind.Empty,
        PieceKind.Empty,
    ],
    [
        PieceKind.Empty,
        PieceKind.Empty,
        PieceKind.Empty,
        PieceKind.Empty,
        PieceKind.Empty,
        PieceKind.Empty,
        PieceKind.Empty,
        PieceKind.Empty,
        PieceKind.Empty,
    ],
    [
        PieceKind._Pawn,
        PieceKind.Empty,
        PieceKind._Pawn,
        PieceKind.Empty,
        PieceKind._Pawn,
        PieceKind.Empty,
        PieceKind._Pawn,
        PieceKind.Empty,
        PieceKind._Pawn,
    ],
    [
        PieceKind.Empty,
        PieceKind._Cannon,
        PieceKind.Empty,
        PieceKind.Empty,
        PieceKind.Empty,
        PieceKind.Empty,
        PieceKind.Empty,
        PieceKind._Cannon,
        PieceKind.Empty,
    ],
    [
        PieceKind.Empty,
        PieceKind.Empty,
        PieceKind.Empty,
        PieceKind.Empty,
        PieceKind.Empty,
        PieceKind.Empty,
        PieceKind.Empty,
        PieceKind.Empty,
        PieceKind.Empty,
    ],
    [
        PieceKind._Rook,
        PieceKind._Knight,
        PieceKind._Elephant,
        PieceKind._Mandarin,
        PieceKind._King,
        PieceKind._Mandarin,
        PieceKind._Elephant,
        PieceKind._King,
        PieceKind._Rook,
    ],
];

export function BoardIndex(row: number, column: number): number {
    return row * BOARD_COLUMNS + column;
}

export function RenderBoard(state: State): Board {
    const ret: Board = new Array(BOARD_ROWS * BOARD_COLUMNS);

    for (let p of state.pieces) {
        ret[BoardIndex(p.pos.row, p.pos.column)] = p.kind;
    }

    return ret;
}

export function InitSession(): Session {
    function shuffle<T>(arr: Array<T>) {
        for (let i = arr.length - 1; i > 0; --i) {
            const j = Math.floor(Math.random() * i);
            const t = arr[i]!;
            arr[i] = arr[j]!;
            arr[j] = t;
        }
    }

    const PIECES: PieceKind[] = [
        PieceKind.Rook,
        PieceKind.Knight,
        PieceKind.Elephant,
        PieceKind.Mandarin,
        PieceKind.Mandarin,
        PieceKind.Elephant,
        PieceKind.Knight,
        PieceKind.Rook,
        PieceKind.Cannon,
        PieceKind.Cannon,
        PieceKind.Pawn,
        PieceKind.Pawn,
        PieceKind.Pawn,
        PieceKind.Pawn,
        PieceKind.Pawn,
    ];

    const RED_POS: Position[] = [
        { row: 0, column: 0 },
        { row: 0, column: 1 },
        { row: 0, column: 2 },
        { row: 0, column: 3 },
        { row: 0, column: 5 },
        { row: 0, column: 6 },
        { row: 0, column: 7 },
        { row: 0, column: 8 },
        { row: 2, column: 1 },
        { row: 2, column: 7 },
        { row: 3, column: 0 },
        { row: 3, column: 2 },
        { row: 3, column: 4 },
        { row: 3, column: 6 },
        { row: 3, column: 8 },
    ];

    const BLACK_POS: Position[] = [
        { row: 9, column: 0 },
        { row: 9, column: 1 },
        { row: 9, column: 2 },
        { row: 9, column: 3 },
        { row: 9, column: 5 },
        { row: 9, column: 6 },
        { row: 9, column: 7 },
        { row: 9, column: 8 },
        { row: 7, column: 1 },
        { row: 7, column: 7 },
        { row: 7, column: 0 },
        { row: 6, column: 2 },
        { row: 6, column: 4 },
        { row: 6, column: 6 },
        { row: 6, column: 8 },
    ];

    shuffle(RED_POS);
    shuffle(BLACK_POS);

    const init = new Array<PieceKind>(BOARD_ROWS * BOARD_COLUMNS);
    init.fill(PieceKind.Empty);

    for (let i = 0; i < PIECES.length; ++i) {
        init[BoardIndex(RED_POS[i]!.row, RED_POS[i]!.column)] = PIECES[i]!;
        init[BoardIndex(BLACK_POS[i]!.row, BLACK_POS[i]!.column)] = -PIECES[i]!;
    }

    init[BoardIndex(0, 4)] = PieceKind.King;
    init[BoardIndex(BOARD_ROWS - 1, 4)] = -PieceKind.King;

    const board = init.slice();

    return {
        init,
        board,
        deads: [],
    };
}

export function AvailableMovement(state: State | Board, pos: Position): Position[] {
    if (pos.row >= BOARD_ROWS || pos.column >= BOARD_COLUMNS || pos.row < 0 || pos.column < 0) {
        return [];
    }

    const board = !Array.isArray(state) ? RenderBoard(state) : state;
    const piece = board[BoardIndex(pos.row, pos.column)]!;

    const ret: Position[] = [];
    const pushRetIfSuitable = (row: number, column: number) => {
        if (
            row >= 0 &&
            row < BOARD_ROWS &&
            column >= 0 &&
            column < BOARD_COLUMNS &&
            (piece < 0 ? board[BoardIndex(row, column)]! >= 0 : board[BoardIndex(row, column)]! <= 0)
        ) {
            ret.push({
                row,
                column: pos.column,
            });
        }
    };

    let actPiece = Math.abs(piece);
    if (actPiece == PieceKind.Unknown) {
        actPiece = ACT_PIECE[pos.row]![pos.column]!;
    }

    switch (actPiece) {
        case PieceKind.Rook: {
            // up
            for (let row = pos.row + 1; row < BOARD_ROWS; ++row) {
                pushRetIfSuitable(row, pos.column);

                if (board[BoardIndex(row, pos.column)]! != PieceKind.Empty) {
                    break;
                }
            }

            // down
            for (let row = pos.row - 1; row >= 0; --row) {
                pushRetIfSuitable(row, pos.column);

                if (board[BoardIndex(row, pos.column)]! != PieceKind.Empty) {
                    break;
                }
            }

            // right
            for (let column = pos.column + 1; column < BOARD_ROWS; ++column) {
                pushRetIfSuitable(pos.row, column);

                if (board[BoardIndex(pos.row, column)]! != PieceKind.Empty) {
                    break;
                }
            }

            // left
            for (let column = pos.column - 1; column >= 0; --column) {
                pushRetIfSuitable(pos.row, column);

                if (board[BoardIndex(pos.row, column)]! != PieceKind.Empty) {
                    break;
                }
            }

            break;
        }
        case PieceKind.Knight: {
            const M: [Position, Position[]][] = [
                [
                    { row: 1, column: 0 },
                    [
                        { row: 2, column: 1 },
                        { row: 2, column: -1 },
                    ],
                ],
                [
                    { row: -1, column: 0 },
                    [
                        { row: -2, column: 1 },
                        { row: -2, column: -1 },
                    ],
                ],
                [
                    { row: 0, column: 1 },
                    [
                        { row: 1, column: 2 },
                        { row: -1, column: 2 },
                    ],
                ],
                [
                    { row: 0, column: -1 },
                    [
                        { row: 1, column: -2 },
                        { row: -1, column: -2 },
                    ],
                ],
            ];

            for (let [b, ms] of M) {
                const blockRow = pos.row + b.row;
                const blockColumn = pos.column + b.column;
                if (blockRow >= BOARD_ROWS || blockColumn >= BOARD_COLUMNS || blockRow < 0 || blockColumn < 0) {
                    continue;
                }

                if (board[BoardIndex(blockRow, blockColumn)]! != PieceKind.Empty) {
                    continue;
                }

                for (let m of ms) {
                    const row = pos.row + m.row;
                    const column = pos.column + m.column;
                    pushRetIfSuitable(row, column);
                }
            }

            break;
        }
        case PieceKind.Elephant: {
            const M: [Position, Position][] = [
                [
                    { row: 1, column: 1 },
                    { row: 2, column: 2 },
                ],
                [
                    { row: -1, column: 1 },
                    { row: -2, column: 2 },
                ],
                [
                    { row: 1, column: -1 },
                    { row: 2, column: -2 },
                ],
                [
                    { row: -1, column: -1 },
                    { row: -2, column: -2 },
                ],
            ];

            for (let [b, m] of M) {
                const blockRow = pos.row + b.row;
                const blockColumn = pos.column + b.column;
                if (blockRow >= BOARD_ROWS || blockColumn >= BOARD_COLUMNS || blockRow < 0 || blockColumn < 0) {
                    continue;
                }

                if (board[BoardIndex(blockRow, blockColumn)]! != PieceKind.Empty) {
                    continue;
                }

                const row = pos.row + m.row;
                const column = pos.column + m.column;
                pushRetIfSuitable(row, column);
            }

            break;
        }
        case PieceKind.Mandarin: {
            const M: Position[] = [
                { row: 1, column: 1 },
                { row: -1, column: 1 },
                { row: 1, column: -1 },
                { row: -1, column: -1 },
            ];

            for (let m of M) {
                const row = pos.row + m.row;
                const column = pos.column + m.column;
                pushRetIfSuitable(row, column);
            }

            break;
        }
        case PieceKind.King: {
            const M: Position[] = [
                { row: 1, column: 1 },
                { row: 1, column: 0 },
                { row: 1, column: -1 },
                { row: 0, column: -1 },
                { row: -1, column: -1 },
                { row: -1, column: 0 },
                { row: -1, column: 1 },
                { row: 0, column: 1 },
            ];

            for (let m of M) {
                const row = pos.row + m.row;
                const column = pos.column + m.column;
                if (piece < 0) {
                    if (row >= BOARD_ROWS - 3 && column >= BOARD_COLUMNS - 6 && column < BOARD_COLUMNS - 3) {
                        let foundOtherSideKing = false;
                        for (let r = 0; r < BOARD_ROWS; ++r) {
                            if (board[BoardIndex(r, column)]! == PieceKind.King) {
                                foundOtherSideKing = true;
                                break;
                            }
                        }

                        if (!foundOtherSideKing) {
                            pushRetIfSuitable(row, column);
                        }
                    }
                } else {
                    if (row < 3 && column >= BOARD_COLUMNS - 6 && column < BOARD_COLUMNS - 3) {
                        let foundOtherSideKing = false;
                        for (let r = 0; r < BOARD_ROWS; ++r) {
                            if (board[BoardIndex(r, column)]! == PieceKind._King) {
                                foundOtherSideKing = true;
                                break;
                            }
                        }

                        if (!foundOtherSideKing) {
                            pushRetIfSuitable(row, column);
                        }
                    }
                }
            }

            break;
        }
        case PieceKind.Cannon: {
            // up
            let jump = false;
            for (let row = pos.row + 1; row < BOARD_ROWS; ++row) {
                if (jump) {
                    if (
                        piece < 0 ? board[BoardIndex(row, pos.column)]! >= 0 : board[BoardIndex(row, pos.column)]! <= 0
                    ) {
                        pushRetIfSuitable(row, pos.column);
                        break;
                    } else if (board[BoardIndex(row, pos.column)]! != PieceKind.Empty) {
                        break;
                    }
                } else {
                    if (board[BoardIndex(row, pos.column)]! == PieceKind.Empty) {
                        pushRetIfSuitable(row, pos.column);
                    } else {
                        jump = true;
                    }
                }
            }

            // down
            jump = false;
            for (let row = pos.row - 1; row >= 0; --row) {
                if (jump) {
                    if (
                        piece < 0 ? board[BoardIndex(row, pos.column)]! >= 0 : board[BoardIndex(row, pos.column)]! <= 0
                    ) {
                        pushRetIfSuitable(row, pos.column);
                        break;
                    } else if (board[BoardIndex(row, pos.column)]! != PieceKind.Empty) {
                        break;
                    }
                } else {
                    if (board[BoardIndex(row, pos.column)]! == PieceKind.Empty) {
                        pushRetIfSuitable(row, pos.column);
                    } else {
                        jump = true;
                    }
                }
            }

            // right
            jump = false;
            for (let column = pos.column + 1; column < BOARD_COLUMNS; ++column) {
                if (jump) {
                    if (
                        piece < 0 ? board[BoardIndex(pos.row, column)]! >= 0 : board[BoardIndex(pos.row, column)]! <= 0
                    ) {
                        pushRetIfSuitable(pos.row, column);
                        break;
                    } else if (board[BoardIndex(pos.row, column)]! != PieceKind.Empty) {
                        break;
                    }
                } else {
                    if (board[BoardIndex(pos.row, column)]! == PieceKind.Empty) {
                        pushRetIfSuitable(pos.row, column);
                    } else {
                        jump = true;
                    }
                }
            }

            // left
            jump = false;
            for (let column = pos.column - 1; column >= 0; --column) {
                if (jump) {
                    if (
                        piece < 0 ? board[BoardIndex(pos.row, column)]! >= 0 : board[BoardIndex(pos.row, column)]! <= 0
                    ) {
                        pushRetIfSuitable(pos.row, column);
                        break;
                    } else if (board[BoardIndex(pos.row, column)]! != PieceKind.Empty) {
                        break;
                    }
                } else {
                    if (board[BoardIndex(pos.row, column)]! == PieceKind.Empty) {
                        pushRetIfSuitable(pos.row, column);
                    } else {
                        jump = true;
                    }
                }
            }

            break;
        }
        case PieceKind.Pawn: {
            if (piece < 0) {
                const M: Position[] = [
                    { row: -1, column: 0 },
                    { row: 0, column: -1 },
                    { row: 0, column: 1 },
                ];

                if (pos.row < 4) {
                    for (let m of M) {
                        const row = pos.row + m.row;
                        const column = pos.column + m.column;
                        pushRetIfSuitable(row, column);
                    }
                } else {
                    const row = pos.row + M[0]!.row;
                    const column = pos.column + M[0]!.column;
                    pushRetIfSuitable(row, column);
                }
            } else {
                const M: Position[] = [
                    { row: 1, column: 0 },
                    { row: 0, column: -1 },
                    { row: 0, column: 1 },
                ];

                if (pos.row > 3) {
                    for (let m of M) {
                        const row = pos.row + m.row;
                        const column = pos.column + m.column;
                        pushRetIfSuitable(row, column);
                    }
                } else {
                    const row = pos.row + M[0]!.row;
                    const column = pos.column + M[0]!.column;
                    pushRetIfSuitable(row, column);
                }
            }

            break;
        }
    }

    return ret;
}
