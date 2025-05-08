const sampleData = {
  item: [
    {
      id: 1,
      name: '아이템1',
      sub: [
        {
          id: 'A',
          name: '서브아이템A',
        },
        {
          id: 'B',
          name: '서브아이템B',
        },
      ],
    },
    { id: 2, name: '아이템2' },
  ],
}

module.exports = {
  item: sampleData.item,
}
