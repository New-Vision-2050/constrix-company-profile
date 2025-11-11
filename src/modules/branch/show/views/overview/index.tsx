import { BE_Branch } from "@/types/api/base/branch";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import dayjs from "dayjs";
import { Location, Call, Sms, Clock, Global } from "iconsax-reactjs";
import { useTranslations } from "next-intl";

type Props = {
  branch: BE_Branch;
};

function BranchOverviewTab({ branch }: Props) {
  const t = useTranslations();

  return (
    <Grid container spacing={4}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Card>
          <CardHeader title={t("common.about")} />
          <CardContent>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Location />
                </ListItemIcon>
                <ListItemText
                  primary={t("branches.overviewDetails.address")}
                  secondary={branch.address}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Global />
                </ListItemIcon>
                <ListItemText
                  primary={t("branches.overviewDetails.location")}
                  secondary={`${branch.city}${branch.country ? `, ${branch.country}` : ""}`}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Call />
                </ListItemIcon>
                <ListItemText
                  primary={t("branches.overviewDetails.phone")}
                  secondary={branch.phone}
                />
              </ListItem>
              {branch.email && (
                <ListItem>
                  <ListItemIcon>
                    <Sms />
                  </ListItemIcon>
                  <ListItemText
                    primary={t("branches.overviewDetails.email")}
                    secondary={branch.email}
                  />
                </ListItem>
              )}
              <ListItem>
                <ListItemIcon>
                  <Clock />
                </ListItemIcon>
                <ListItemText
                  primary={t("branches.overviewDetails.createdAt")}
                  secondary={dayjs(branch.createdAt).format("YYYY-MM-DD")}
                />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Card>
          <CardHeader title={t("branches.overviewDetails.workingHours")} />
          <CardContent>
            {branch.workingHours ? (
              <List>
                {Object.entries(branch.workingHours).map(([day, slots]) => (
                  <>
                    {slots && slots.length > 0 ? (
                      slots.map(
                        (
                          slot: { startTime: string; durationMs: number },
                          index: number
                        ) => {
                          // Parse start time and calculate end time
                          const startTime = dayjs(
                            `2000-01-01 ${slot.startTime}`
                          );
                          const endTime = startTime.add(
                            slot.durationMs,
                            "milliseconds"
                          );

                          // Check if shift extends to next day
                          const extendsToNextDay = endTime.isAfter(
                            startTime,
                            "day"
                          );

                          return (
                            <ListItem key={`${day}-${index}`}>
                              <ListItemText
                                primary={t(`common.days.${day}`)}
                                secondary={
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 1,
                                    }}
                                  >
                                    <span
                                      style={{
                                        direction: "ltr",
                                      }}
                                    >
                                      {startTime.format("hh:mmA")}
                                    </span>
                                    <span
                                      style={{
                                        direction: "ltr",
                                      }}
                                    >
                                      -{" "}
                                    </span>
                                    <span
                                      style={{
                                        direction: "ltr",
                                      }}
                                    >
                                      {endTime.format("hh:mmA")}
                                    </span>
                                    {extendsToNextDay && (
                                      <Chip
                                        label={t(
                                          "branches.overviewDetails.nextDay"
                                        )}
                                        size="small"
                                        color="warning"
                                        variant="outlined"
                                      />
                                    )}
                                  </Box>
                                }
                              />
                            </ListItem>
                          );
                        }
                      )
                    ) : (
                      <ListItem key={day}>
                        <ListItemText
                          primary={t(`common.days.${day}`)}
                          secondary={t("branches.overviewDetails.closed")}
                        />
                      </ListItem>
                    )}
                  </>
                ))}
              </List>
            ) : (
              <Typography variant="body2" color="text.secondary">
                {t("branches.overviewDetails.noWorkingHours")}
              </Typography>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default BranchOverviewTab;
