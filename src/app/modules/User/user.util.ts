import prisma from "../../utils/prisma";

// pieChart
export const getPieChartData = async () => {
  const appointmentStatusDistribution = await prisma.adoptionRequest.groupBy({
    by: ["adoptionStatus"],
    _count: {
      id: true,
    },
  });

  const formattedAppointmentStatusDistribution = appointmentStatusDistribution.map(
    ({ adoptionStatus, _count }) => ({
      adoptionStatus,
      count: Number(_count.id),
    })
  );

  return formattedAppointmentStatusDistribution;
};
