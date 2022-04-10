# 交叉类型

> typeScript 中交叉类型是将多个类型合并为一个类型；通过 `&` 运算符可以将现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性。

```ts
type PartialPointX = { x: number }
type Point = PartialPointX & { y: number }
const point: Point = {
  x: 1,
  y: 1
}
```

上面代码文稿中定义了 `PartialPointX` 类型， 接着使用 `&` 运算符创建一个新的 `Point` 类型，表示一个含有 `x` 和 `y` 坐标的点，然后定义了一个 `Point` 类型的变量并初始化。
