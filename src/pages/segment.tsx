import SegmentCard from '../components/SegmentCard'

const segmentData = [
  {
    name: 'Segment 1',
    percentage: 20,
    riskLevels: [
      {
        name: 'Low',
        percentage: 80,
        biases: [
          {
            name: 'Anchoring',
            percentage: 60,
            product: 'Capital Protection ETF',
          },
          {
            name: 'Loss Aversion',
            percentage: 40,
            product: 'Balanced Fund',
          },
        ],
      },
    ],
  },
  {
    name: 'Segment 2',
    percentage: 35,
    riskLevels: [
      {
        name: 'Medium',
        percentage: 70,
        biases: [
          {
            name: 'Overconfidence',
            percentage: 50,
            product: 'Smart Beta ETF',
          },
          {
            name: 'Herding',
            percentage: 20,
            product: 'Equity Mutual Fund',
          },
        ],
      },
      {
        name: 'High',
        percentage: 30,
        biases: [
          {
            name: 'Self-Attribution',
            percentage: 75,
            product: 'Leveraged ETF',
          },
        ],
      },
    ],
  },
];


function RoleManagement() {
  return (
    <div>
      {segmentData.map((seg, index) => (
        <SegmentCard key={index} segment={seg} />
      ))}
      
    </div>
  )
}

export default RoleManagement