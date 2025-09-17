export type Counter = {
  "version": "0.1.0",
  "name": "counter",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "counter",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "increment",
      "accounts": [
        {
          "name": "counter",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "delegate",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pda",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "commit",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "counter",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "incrementAndUndelegate",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "counter",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    }
  ]
};

export const IDL: Counter = {
  "version": "0.1.0",
  "name": "counter",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "counter",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "increment",
      "accounts": [
        {
          "name": "counter",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "delegate",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pda",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "commit",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "counter",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "incrementAndUndelegate",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "counter",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    }
  ]
};