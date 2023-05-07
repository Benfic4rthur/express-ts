// 1 - iniciando projeto
console.log('Express + TypeScript!');
// 2 - inicializar Express
import express, { NextFunction, Request, Response } from 'express';

const app = express();

// 3 - rota com POST

app.use(express.json());

// 11 - middleware global (todas as rotas)
function showPath(req: Request, res: Response, next: NextFunction) {
    console.log(`Request recebido em ${req.path}`);
    next();
}
app.use(showPath);

app.get('/', (req, res) => {
    return res.send('Olá Express Mundo!');
});

// 3 - rota com POST

app.post('/api/product', (req, res) => {
    console.log(req.body);
    return res.send('Produto adicionado!');
});

// 4 - rota para todos os verbos

app.all('/api/product/check', (req, res) => {
    if (req.method === 'POST') {
        return res.send('Inseriu algum registro');
    } else if (req.method === 'GET') {
        return res.send('Leu algum registro');
    } else {
        return res.send('Não podemos realizar esta operação');
    }
});

// 5 - interface do express

app.get('/api/interfaces', (req: Request, res: Response) => {
    return res.send('Interfaces do Express');
});

// 6 - enviando json

app.get('/api/json', (req: Request, res: Response) => {
    return res.json({
        nome: 'Express',
        categoria: 'Framework',
        preco: 0,
    });
});

// 7 - router parameters
app.get('/api/product/:id', (req: Request, res: Response) => {
    console.log(req.params);
    const id = req.params.id;
    if (req.params.id === '1') {
        const product = {
            id: 1,
            name: 'Produto 1',
            description: 'Descrição do produto 1',
            price: 100,
        };
        return res.json(product);
    } else if (req.params.id === '2') {
        const product = {
            id: 2,
            name: 'Produto 2',
            description: 'Descrição do produto 2',
            price: 200,
        };
        return res.json(product);
    } else {
        return res.send(`Produto ${id} não encontrado!`);
    }
});

// 8 - rotas complexas
app.get('/api/product/:id/review/:idReview', (req: Request, res: Response) => {
    const idProduct = req.params.id;
    const idReview = req.params.idReview;
    if (req.params.id === '1' && req.params.idReview === '1') {
        const review = {
            id: 1,
            description: `Review do produto ${idProduct}`,
        };
        return res.json(review);
    } else if (req.params.id === '2' && req.params.idReview === '2') {
        const review = {
            id: 2,
            description: `Review do produto ${idProduct}`,
        };
        return res.json(review);
    } else {
        return res.send(`Produto ${idProduct} ou review ${idReview} não encontrado!`);
    }
});

// 9 - router handler

function getUser(req: Request, res: Response) {
    console.log(`Resgatando usuário ${req.params.id}`);
    return res.send(`Resgatando usuário ${req.params.id}`);
}
app.get('/api/user/:id', getUser);

// 10 - middleware
function checkUser(req: Request, res: Response, next: NextFunction) {
    if (req.params.id === '1') {
        console.log('Usuário válido');
        next();
    } else {
        console.log('Usuário inválido');
        return res.send('Usuário inválido');
    }
}

app.get('/api/user/:id/access/', checkUser, (req: Request, res: Response, next: any) => {
    res.json({ message: 'Bem vindo a área restrita' });
    next();
});

// 12 - REQ E RES COM GENERICS
app.get(
    '/api/user/:id/details/:name',
    (req: Request<{ id: string; name: string }>, res: Response<{ status: boolean }>) => {
        console.log(`ID: ${req.params.id} - NAME: ${req.params.name}`);
        return res.json({ status: true });
    },
);

// 13 - tratando erros
app.get('/api/error', (req: Request, res: Response) => {
    try {
        throw new Error('Erro genérico');
    } catch (e: any) {
        res.statusCode = 500;
        res.status(500).json({ message: e.message });
    }
});

app.listen(3000, () => {
    console.log('Aplicação de TS + Express rodando na porta 3000');
});
