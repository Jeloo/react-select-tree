The component helps you to select elements of tree-like data structure step by step, level by level

The repository itself is not moved to separate npm package yet. So it contains source code for the component and several examples inside the main App.js component as well.

Example usage: assume that you are using the marketplace and you are looking for the ads from some specific categories or subcategories.

```jsx
<MultipleSelectConsumer initialSelection={[1, 2]}>
  {(addItem, removeItem, selection) => (
    <MultistepSelect
      data={dummyData}
      selection={selection}
      onConfirm={addItem}
      onRemove={removeItem}
      selectedListComponent={MultipleSelectedListNested}
      classNamesConfig={{
        selectContainer: ["App-container"],
        select: ["App-select"],
        confirmBtn: ["Button Button--success"],
        resetBtn: ["Button Button--danger"],
        buttonsContainer: ["ButtonGroup-container"]
      }}
    />
  )}
</MultipleSelectConsumer>
```

It provides ability to limit the selection

```jsx
<MultipleSelectConsumer initialSelection={[1, 2]}>
  {(addItem, removeItem, selection) => (
    <MultistepSelect
      data={dummyData}
      selection={selection}
      onConfirm={addItem}
      onRemove={removeItem}
      selectedListComponent={MultipleSelectedListNested}
      classNamesConfig={{
        selectContainer: ["App-container"],
        select: ["App-select"],
        confirmBtn: ["Button Button--success"],
        resetBtn: ["Button Button--danger"],
        buttonsContainer: ["ButtonGroup-container"]
      }}
      maxCount={2}
    />
  )}
</MultipleSelectConsumer>
```

You can pass the specific component to customize rendering of selected items:

```jsx
<MultipleSelectConsumer initialSelection={[1, 2]}>
  {(addItem, removeItem, selection) => (
    <MultistepSelect
      data={dummyData}
      selection={selection}
      onConfirm={addItem}
      onRemove={removeItem}
      selectedListComponent={props => {
        return (
          <ul>
            {props.selection.map(item => (
              <li key={item.id}>
                {item.name}{" "}
                <span
                  style={{ cursor: "pointer" }}
                  onClick={props.onRemove.bind(null, item.id)}
                >
                  [X]
                </span>
              </li>
            ))}
          </ul>
        );
      }}
      classNamesConfig={{
        selectContainer: ["App-container"],
        select: ["App-select"],
        confirmBtn: ["Button Button--success"],
        resetBtn: ["Button Button--danger"],
        buttonsContainer: ["ButtonGroup-container"]
      }}
    />
  )}
</MultipleSelectConsumer>
```
