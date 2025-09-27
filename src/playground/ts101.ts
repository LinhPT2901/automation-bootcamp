// 1. Primitives & inference
let title = 'Example';        // string (inferred)
let count: number = 0;        // explicit
let isOk = true;              // boolean (inferred)

// 2. Object & Array
type Creds = { email: string; pass: string; remember?: boolean }; // remember? = optional
const users: Creds[] = [
  { email: 'a@ex.com', pass: 'Abc12345!' },
];

// 3. Functions (params & return)
function maskEmail(email: string): string {
  const [name, rest] = email.split('@');
  return `${name.slice(0, 2)}***@${rest}`;
}
const add = (a: number, b: number): number => a + b;

// 4. Union & literal types
type Status = 'idle' | 'loading' | 'error' | 'success';
function nextStatus(s: Status): Status {
  if (s === 'idle') return 'loading';
  if (s === 'loading') return 'success';
  return s; // error/success giữ nguyên
}

// 5. Optional chaining & nullish coalescing
const note = users[0]?.email ?? 'no-email';

// 6. Narrowing (typeof / in)
function toInt(x: string | number): number {
  return typeof x === 'string' ? parseInt(x, 10) : x;
}

// 7. any vs unknown (ưu tiên unknown rồi kiểm tra)
function parseJson<T>(raw: string): T {
  return JSON.parse(raw) as T; // dùng generic an toàn hơn any
}
// 8. Async/Await trả Promise<T>
type Product = { id: number; title: string; price: number };

async function fetchProductsFake(limit = 2): Promise<Product[]> {
  // giả lập API: trong test thực tế bạn dùng request.get(...)
  const data: Product[] = [
    { id: 1, title: 'A', price: 10 },
    { id: 2, title: 'B', price: 20 },
  ];
  return data.slice(0, limit);
}

(async () => {
  const list = await fetchProductsFake(1);
  // type-safety:
  const p = list[0];
  const total = list.reduce((sum, item) => sum + item.price, 0);
  console.log('first:', p.title, 'total:', total);
})();