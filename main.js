
class TotoGenerator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        .generator-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        button {
          padding: 12px 24px;
          font-size: 1rem;
          color: white;
          background: linear-gradient(45deg, #6a11cb, #2575fc);
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
        }

        .numbers-display {
          display: flex;
          gap: 10px;
          margin-top: 20px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .number-circle {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-color:rgb(240, 240, 240);
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.5rem;
          font-weight: bold;
          color: #333;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          animation: reveal 0.5s ease-in-out forwards;
        }
        
        @keyframes reveal {
            from {
                transform: scale(0);
                opacity: 0;
            }
            to {
                transform: scale(1);
                opacity: 1;
            }
        }

      </style>
      <div class="generator-container">
        <button id="generate-btn">Generate Numbers</button>
        <div class="numbers-display"></div>
      </div>
    `;

    this.generateBtn = this.shadowRoot.querySelector('#generate-btn');
    this.numbersDisplay = this.shadowRoot.querySelector('.numbers-display');

    this.generateBtn.addEventListener('click', () => this.generateNumbers());
  }

  generateNumbers() {
    this.numbersDisplay.innerHTML = '';
    const numbers = new Set();
    while (numbers.size < 6) {
      numbers.add(Math.floor(Math.random() * 49) + 1);
    }

    Array.from(numbers).sort((a,b) => a-b).forEach((number, index) => {
        setTimeout(() => {
            const circle = document.createElement('div');
            circle.classList.add('number-circle');
            circle.textContent = number;
            this.numbersDisplay.appendChild(circle);
        }, index * 100)
    });
  }
}

customElements.define('toto-generator', TotoGenerator);
