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
      ],
    },
    { id: 2, name: '아이템2' },
  ],
}

module.exports = {
  item: sampleData.item,
}
